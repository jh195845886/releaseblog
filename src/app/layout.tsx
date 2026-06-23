import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ReleaseBlog — Turn Releases Into SEO Traffic",
  description:
    "Connect GitHub, auto-generate SEO blog posts from every release. Rank on Google without writing a word.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
