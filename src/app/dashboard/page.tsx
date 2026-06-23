import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import SignOutButton from "./signout-button"
import RepoList from "./repo-list"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary-600">ReleaseBlog</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">
              {session.user?.name}
            </span>
            <SignOutButton />
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900">
            Your Repositories
          </h2>
          <p className="mt-2 text-slate-500">
            Connect a repo to auto-generate SEO blog posts from every release.
          </p>
        </div>

        <RepoList accessToken={(session as any).accessToken} />
      </main>
    </div>
  )
}
