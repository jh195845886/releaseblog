import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ReleaseBlog — Turn Releases Into SEO Traffic",
  description: "Connect GitHub, auto-generate SEO blog posts from every release. Rank on Google without writing a word.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script src="https://cdn.paddle.com/paddle/v2/paddle.js"></script>
        <script dangerouslySetInnerHTML={{ __html: 'Paddle.Environment.set("sandbox"); Paddle.Initialize({ token: "test_64fccef3346136b0548b195fedd" });' }} />
        {children}
      </body>
    </html>
  )
}
