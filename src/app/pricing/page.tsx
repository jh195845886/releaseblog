import Link from "next/link"

export default function PricingPage() {
  const PRO = "https://benboba.lemonsqueezy.com/checkout/buy/8221fa52-83be-49f2-bf14-71ecc56eb53e"
  const plans = [
    { name: "Free", price: "$0", period: "forever", features: ["1 blog post/month", "SEO-optimized", "Markdown export"], cta: "Get Started", href: "/login", hl: false },
    { name: "Pro", price: "$19", period: "/mo", features: ["10 posts/month", "SEO + social copy", "Priority AI", "Custom templates"], cta: "Start Pro", href: PRO, hl: true },
    { name: "Unlimited", price: "$49", period: "/mo", features: ["Unlimited posts", "Everything in Pro", "Auto-publish", "Team"], cta: "Go Unlimited", href: PRO, hl: false },
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50">
      <header className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-slate-900">Simple, transparent pricing</h1>
        <p className="mt-4 text-lg text-slate-500">Start free, upgrade when you need more. Cancel anytime.</p>
      </header>
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p) => (
            <div key={p.name} className={"rounded-2xl p-8 " + (p.hl ? "bg-slate-900 text-white ring-4 ring-primary-300 scale-105" : "bg-white border")}>
              <h3 className="text-xl font-bold">{p.name}</h3>
              <div className="mt-4"><span className="text-4xl font-bold">{p.price}</span><span className="text-lg text-slate-400">{p.period}</span></div>
              <ul className="mt-8 space-y-3">{p.features.map((f) => <li key={f} className="flex gap-2"><span>✓</span><span>{f}</span></li>)}</ul>
              <Link href={p.href} className={"mt-8 block w-full text-center py-3 rounded-xl font-medium " + (p.hl ? "bg-primary-500 text-white" : "bg-slate-900 text-white")}>{p.cta}</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
