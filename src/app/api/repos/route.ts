import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.accessToken) {
    return NextResponse.json({ err: "Not authenticated" }, { status: 401 })
  }

  try {
    const resp = await fetch(
      "https://api.github.com/user/repos?sort=updated&per_page=50&type=owner",
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: "application/vnd.github+json",
        },
      })
    if (!resp.ok) {
      return NextResponse.json({ err: `GitHub error: ${resp.status}` }, { status: resp.status })
    }
    return NextResponse.json({ repos: await resp.json() })
  } catch (e: any) {
    return NextResponse.json({ err: e.message || "Failed" }, { status: 500 })
  }
}
