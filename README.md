# 🚀 ReleaseBlog — Turn GitHub Releases Into SEO Traffic

[![Website](https://img.shields.io/badge/website-releaseblog.vercel.app-black?logo=vercel)](https://releaseblog.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

**Stop writing changelogs nobody reads. Every GitHub release → SEO blog post. Automatically.**

<p align="center">
  <img src="public/og-image.png" alt="ReleaseBlog" width="600">
</p>

## What It Does

1. **Connect** your GitHub repo
2. **Create a release** with notes  
3. **Get a blog post** — SEO-optimized title, meta description, body, keywords, and social copy

## Quick Start

```bash
# Visit the app
open https://releaseblog.vercel.app
# Sign in with GitHub → Pick a repo → Done
```

## Features & Pricing

| Feature | Free | Pro ($19/mo) | Team ($49/mo) |
|---------|------|-------------|--------------|
| Blog posts / month | 1 | 10 | Unlimited |
| Basic SEO | ✅ | ✅ | ✅ |
| Advanced SEO | - | ✅ | ✅ |
| Social media copy | - | ✅ | ✅ |
| Multiple repos | - | - | ✅ |
| Custom brand voice | - | - | ✅ |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Auth:** NextAuth.js + GitHub OAuth
- **AI:** Blog generation via LLM API
- **Payments:** Paddle
- **Styling:** Tailwind CSS
- **Hosting:** Vercel

## Local Dev

```bash
git clone https://github.com/jh195845886/releaseblog.git
cd releaseblog && npm install && npm run dev
```

## Why This Exists

Indie hackers spend more time writing blog posts than shipping features. ReleaseBlog flips that — you ship, we write.

---

*Built for developers who'd rather push code than publish posts.*
