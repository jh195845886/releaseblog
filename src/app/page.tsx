import Link from "next/link"
import WaitlistForm from "./WaitlistForm"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50">
      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-block mb-6 px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
          🚀 Now in beta
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight">
          Turn Every Release
          <br />
          <span className="text-primary-600">Into SEO Traffic</span>
        </h1>
        <p className="mt-6 text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Connect your GitHub repo. We watch your releases and auto-generate
          SEO-optimized blog posts, meta descriptions, and social copy — so you
          rank on Google without writing a word.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/login"
            className="px-8 py-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors text-lg font-semibold shadow-lg shadow-slate-900/10"
          >
            Get Started Free
          </Link>
          <a
            href="#how-it-works"
            className="px-8 py-4 text-slate-600 hover:text-slate-900 transition-colors text-lg font-medium"
          >
            How it works →
          </a>
        </div>
      </header>

      {/* Waitlist */}
      <WaitlistForm />

      {/* How it Works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">
          Three steps to SEO automation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              emoji: "🔗",
              title: "Connect GitHub",
              desc: "Sign in with GitHub and pick any repo. Zero configuration needed.",
            },
            {
              emoji: "📝",
              title: "Release & Generate",
              desc: "Every time you create a release, we analyze the changes and craft a blog post.",
            },
            {
              emoji: "📈",
              title: "Rank & Grow",
              desc: "Publish the blog to your site. Google indexes it. New users find you.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 p-8 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{step.emoji}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-slate-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
          Simple Pricing
        </h2>
        <p className="text-slate-500 text-center mb-16">
          Start free. Upgrade when you need more.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              name: "Free",
              price: "$0",
              period: "forever",
              features: ["1 blog post / month", "Basic SEO optimization", "Markdown export"],
              cta: "Get Started",
              href: "/login",
              featured: false,
            },
            {
              name: "Pro",
              price: "$19",
              period: "/month",
              features: [
                "10 blog posts / month",
                "Advanced SEO optimization",
                "Social media copy",
                "Priority generation",
              ],
              cta: "Start Pro",
              href: "/login",
              featured: true,
            },
            {
              name: "Team",
              price: "$49",
              period: "/month",
              features: [
                "Unlimited blog posts",
                "Multiple repos",
                "Custom brand voice",
                "Auto-publish (coming soon)",
                "Priority support",
              ],
              cta: "Start Team",
              href: "/login",
              featured: false,
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-2xl border p-8 ${
                plan.featured
                  ? "border-primary-500 shadow-xl shadow-primary-500/10 scale-105"
                  : "border-slate-200"
              }`}
            >
              {plan.featured && (
                <div className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-3">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-extrabold text-slate-900">
                  {plan.price}
                </span>
                <span className="text-slate-400">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-slate-600 text-sm">
                    <span className="text-green-500">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`block text-center py-3 rounded-xl font-semibold transition-colors ${
                  plan.featured
                    ? "bg-primary-600 text-white hover:bg-primary-700"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-400">
        ReleaseBlog — Built for indie hackers who&apos;d rather ship than write.
      </footer>
    </div>
  )
}
