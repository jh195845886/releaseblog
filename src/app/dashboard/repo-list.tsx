"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Repo {
  id: number
  name: string
  full_name: string
  description: string | null
  language: string | null
  stargazers_count: number
  default_branch: string
}

export default function RepoList({ accessToken }: { accessToken: string }) {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [errMsg, setErrMsg] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetch("/api/repos")
      .then((r) => r.json())
      .then((data) => {
        if (data.err) setErrMsg(data.err)
        else setRepos(data.repos || [])
      })
      .catch(() => setErrMsg("Failed to load repos"))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-white rounded-xl border border-slate-200" />
        ))}
      </div>
    )
  }

  if (errMsg) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500 mb-4">{errMsg}</p>
        <p className="text-slate-400 text-sm">
          Make sure you have repos in your GitHub account.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {repos.map((repo) => (
        <div
          key={repo.id}
          className="bg-white rounded-xl border border-slate-200 p-6 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
          onClick={() => router.push(`/dashboard/${encodeURIComponent(repo.full_name)}`)}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 text-lg">
                {repo.full_name}
              </h3>
              {repo.description && (
                <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                  {repo.description}
                </p>
              )}
            </div>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              ⭐ {repo.stargazers_count}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-4">
            {repo.language && (
              <span className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-600">
                {repo.language}
              </span>
            )}
            <span className="text-xs text-primary-500 font-medium">
              Click to manage →
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
