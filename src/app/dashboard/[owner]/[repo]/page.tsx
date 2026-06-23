"use client"

import { useState, use, useEffect } from "react"
import Link from "next/link"

interface BlogResult {
  title: string
  meta: string
  body: string
  tagName: string
  releaseUrl: string
  tokens: number
}

export default function RepoDetailPage({
  params,
}: {
  params: Promise<{ owner: string; repo: string }>
}) {
  const { owner, repo } = use(params)
  const fullName = `${owner}/${repo}`
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<BlogResult | null>(null)
  const [errMsg, setErrMsg] = useState("")

  async function generateBlog() {
    setLoading(true)
    setErrMsg("")
    setResult(null)

    try {
      const resp = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner, repo }),
      })

      const data = await resp.json()
      if (data.err) {
        setErrMsg(data.err)
      } else {
        setResult(data)
      }
    } catch (e: any) {
      setErrMsg(e.message || "Failed to generate")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm text-slate-400 hover:text-slate-600"
          >
            ← Back
          </Link>
          <h1 className="text-xl font-bold text-slate-900">{fullName}</h1>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Generate Button */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Generate SEO Blog Post
          </h2>
          <p className="text-slate-500 mb-6">
            AI will analyze the latest release and produce an SEO-optimized
            blog post, complete with meta description and social media copy.
          </p>

          <button
            onClick={generateBlog}
            disabled={loading}
            className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-lg"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Analyzing release...
              </span>
            ) : (
              "🚀 Generate Blog Post"
            )}
          </button>

          {errMsg && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {errMsg}
            </div>
          )}
        </div>

        {/* Result */}
        {result && (
          <div className="bg-white rounded-xl border border-slate-200 p-8">
            <div className="mb-6 pb-6 border-b border-slate-100">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                SEO Meta Description
              </div>
              <p className="text-slate-700">{result.meta}</p>
            </div>

            <div className="mb-4">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                Blog Title
              </div>
              <h1 className="text-3xl font-bold text-slate-900">
                {result.title}
              </h1>
            </div>

            <div className="flex items-center gap-4 mb-8 text-sm text-slate-400">
              <span>📦 {result.tagName}</span>
              <a
                href={result.releaseUrl}
                target="_blank"
                className="text-primary-500 hover:underline"
              >
                View on GitHub →
              </a>
              <span>🪙 {result.tokens} tokens</span>
            </div>

            <div className="prose prose-slate max-w-none">
              {result.body.split("\n").map((line, i) => {
                if (line.startsWith("## ")) {
                  return (
                    <h2 key={i} className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                      {line.replace("## ", "")}
                    </h2>
                  )
                }
                if (line.startsWith("### ")) {
                  return (
                    <h3 key={i} className="text-xl font-semibold text-slate-800 mt-6 mb-3">
                      {line.replace("### ", "")}
                    </h3>
                  )
                }
                if (line.trim() === "") {
                  return <div key={i} className="h-3" />
                }
                return (
                  <p key={i} className="text-slate-700 leading-relaxed mb-2">
                    {line}
                  </p>
                )
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `# ${result.title}\n\n> ${result.meta}\n\n${result.body}`
                  )
                }}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
              >
                📋 Copy Markdown
              </button>
              <button
                onClick={() => generateBlog()}
                className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors text-sm"
              >
                🔄 Regenerate
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
