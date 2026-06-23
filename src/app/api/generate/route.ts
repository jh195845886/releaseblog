import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.accessToken) {
    return NextResponse.json({ err: "Not authenticated" }, { status: 401 })
  }

  try {
    const { owner, repo } = await req.json()
    if (!owner || !repo) {
      return NextResponse.json({ err: "owner/repo required" }, { status: 400 })
    }

    const ghUrl = `https://api.github.com/repos/${owner}/${repo}/releases?per_page=1`
    const rResp = await fetch(ghUrl, {
      headers: {
          Authorization: `Bearer ${session.accessToken}`,
        Accept: "application/vnd.github+json",
      },
    })
    if (!rResp.ok) {
      return NextResponse.json({ err: `GitHub error: ${rResp.status}` }, { status: rResp.status })
    }
    const releases = await rResp.json()
    if (!releases.length) {
      return NextResponse.json({ err: "No releases found" }, { status: 404 })
    }

    const rel = releases[0]
    const dsKey = process.env["DEEPSEEK_API_KEY"]
    if (!dsKey) {
      return NextResponse.json({ err: "Missing API key" }, { status: 500 })
    }

    const prompt = `技术博客作者。项目 ${owner}/${repo} 发布了 ${rel.name||rel.tag_name}。发布说明: ${(rel.body||"No notes").slice(0,2500)}。写中文SEO技术博客(500-800字)，含SEO标题和meta描述，H2/H3结构。`

    const dsResp = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          Authorization: `Bearer ${dsKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    })
    if (!dsResp.ok) {
      return NextResponse.json({ err: `DS error: ${dsResp.status}` }, { status: 500 })
    }

    const d = await dsResp.json()
    const c = d.choices[0].message.content

    let t = `${rel.name||rel.tag_name} Blog`
    let m = ""
    let b = c

    const tm = c.match(/TITLE:\s*(.+)/)
    const mm = c.match(/META:\s*(.+)/)
    if (tm) t = tm[1].trim()
    if (mm) m = mm[1].trim()
    b = c.replace(/^---[\s\S]*?---\s*/m, "").trim()

    return NextResponse.json({
      title: t,
      meta: m,
      body: b,
      tagName: rel.tag_name,
      releaseUrl: rel.html_url,
      tokens: d.usage?.total_tokens || 0,
    })
  } catch (e: any) {
    return NextResponse.json({ err: e.message || "Failed" }, { status: 500 })
  }
}
