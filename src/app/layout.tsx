import type { Metadata } from "next"
import "./globals.css"

const BASE_URL = "https://releaseblog.vercel.app"

export const metadata: Metadata = {
  title: "ReleaseBlog — Turn GitHub Releases Into SEO Blog Posts Automatically",
  description:
    "Connect your GitHub repo. Every release auto-generates an SEO-optimized blog post with meta descriptions, social copy, and keywords — rank on Google without writing a word.",
  keywords: [
    "github release blog",
    "SEO blog generator",
    "auto blog post",
    "developer blog",
    "changelog blog",
    "open source marketing",
    "indie hacker SEO",
    "automated content marketing",
    "release notes to blog",
    "github SEO tool",
  ],
  authors: [{ name: "ReleaseBlog" }],
  creator: "ReleaseBlog",
  publisher: "ReleaseBlog",
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    siteName: "ReleaseBlog",
    title: "ReleaseBlog — Turn GitHub Releases Into SEO Blog Posts",
    description: "Connect GitHub. Every release auto-generates an SEO blog post. Rank on Google without writing.",
    url: BASE_URL,
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReleaseBlog — Turn GitHub Releases Into SEO Blog Posts",
    description: "Connect GitHub. Auto-generate SEO blog posts from every release. Rank on Google.",
    images: [`${BASE_URL}/og-image.png`],
    creator: "@releaseblog",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="google-site-verification" content="WVb3Zq1-1EGRgU1otnmRxdjxdpfbGi_l72VAqYz4XvY" />
      </head>
      <body className="antialiased">
        <script src="https://cdn.paddle.com/paddle/v2/paddle.js"></script>
        <script dangerouslySetInnerHTML={{ __html: 'Paddle.Environment.set("sandbox"); Paddle.Initialize({ token: "test_64fccef3346136b0548b195fedd" });' }} />
        {children}
      </body>
    </html>
  )
}
