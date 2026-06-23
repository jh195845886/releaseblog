"use client"

import { signOut } from "next-auth/react"

export default function SignOutButton() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        signOut({ callbackUrl: "/login" })
      }}
    >
      <button className="text-sm text-slate-400 hover:text-slate-600">
        Sign out
      </button>
    </form>
  )
}
