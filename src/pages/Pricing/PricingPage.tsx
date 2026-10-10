import { Link } from "react-router"
import { Check, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const BRAND = "#EF4671"

const plans = [
  {
    name: "Free",
    description: "For individuals getting started with project tracking.",
    price: "$0",
    period: "forever",
    cta: "Get Started Free",
    popular: false,
    features: [
      "Up to 3 projects",
      "Basic task management",
      "Calendar view",
      "5 team members",
      "1 GB storage",
      "Community support",
    ],
  },
  {
    name: "Pro",
    description: "For growing teams who need powerful project tools.",
    price: "$12",
    period: "per user / month",
    cta: "Start 14-Day Trial",
    popular: true,
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Gantt charts & timelines",
      "50 team members",
      "25 GB storage",
      "Priority support",
      "Custom fields",
      "Integrations (Slack, Figma, etc.)",
    ],
  },
  {
    name: "Enterprise",
    description: "For organizations needing security, control & scale.",
    price: "$39",
    period: "per user / month",
    cta: "Contact Sales",
    popular: false,
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Unlimited storage",
      "SSO & SAML",
      "Advanced permissions",
      "Audit logs",
      "Dedicated account manager",
      "Custom onboarding",
      "99.99% uptime SLA",
    ],
  },
]

const faqs = [
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! Pro plan comes with a 14-day free trial. No credit card required to start.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Absolutely. There are no long-term contracts. Cancel anytime from your account settings.",
  },
]

export default function PricingPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-5 pb-20 pt-24 sm:px-8 sm:pt-32 lg:px-12 lg:pt-40">
        {/* Background Glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
          <div className="h-[500px] w-[800px] rounded-full bg-[#EF4671] opacity-[0.06] blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Badge
            className="mb-6 border-0 px-4 py-2 text-sm font-semibold hover:bg-[#fceaf0]"
            style={{ color: BRAND, backgroundColor: "#fceaf0" }}
          >
            <Sparkles className="mr-1.5 size-3.5" />
            Simple Pricing
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Plans that scale with<br />
            <span style={{ color: BRAND }}>your team</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
            Start free and upgrade as your team grows. No hidden fees, no surprises. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl p-8 transition-all lg:p-10 ${
                plan.popular
                  ? "border-2 border-[#EF4671] bg-white shadow-2xl shadow-[#EF4671]/10 scale-[1.03] z-10"
                  : "border border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-5 py-1.5 text-xs font-bold text-white shadow-md"
                  style={{ backgroundColor: BRAND }}
                >
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <p className="mt-2 text-sm text-slate-500">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-extrabold tracking-tight text-slate-900">
                  {plan.price}
                </span>
                <span className="ml-2 text-sm font-medium text-slate-500">
                  {plan.period}
                </span>
              </div>

              <Button
                className={`mb-8 h-12 w-full rounded-xl text-sm font-bold transition-all active:scale-[0.98] ${
                  plan.popular
                    ? "bg-[#EF4671] text-white shadow-lg shadow-[#EF4671]/25 hover:bg-[#D8325C]"
                    : "border-2 border-slate-200 bg-white text-slate-900 hover:border-[#EF4671] hover:text-[#EF4671]"
                }`}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
                <ArrowRight className="ml-2 size-4" />
              </Button>

              <div className="flex-1">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                  What's included
                </p>
                <ul className="space-y-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-700">
                      <Check
                        className="mt-0.5 size-4 shrink-0"
                        style={{ color: BRAND }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-slate-100 bg-slate-50 px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-base text-slate-500">
              Everything you need to know about the pricing plans.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <h3 className="text-base font-bold text-slate-900">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-32">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#EF4671] via-[#E23560] to-[#C42A50] p-10 text-center sm:p-16 lg:p-20 shadow-xl shadow-[#EF4671]/15">
            {/* Decorative */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-white/[0.08] blur-2xl" />
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-[300px] w-[300px] rounded-full bg-black/[0.08] blur-2xl" />

            <h2 className="relative z-10 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to streamline your workflow?
            </h2>
            <p className="relative z-10 mx-auto mt-5 max-w-xl text-base text-white/90 sm:text-lg">
              Join 2,000+ teams already managing projects with DevFlow.
            </p>
            <div className="relative z-10 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-xl bg-white px-8 text-sm font-bold text-slate-900 shadow-xl transition-all hover:bg-slate-50 hover:scale-105 active:scale-[0.98]"
              >
                <Link to="/register">Start Free Trial</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-xl border-2 border-white/40 bg-transparent px-8 text-sm font-bold text-white transition-all hover:bg-white/10 active:scale-[0.98]"
              >
                <Link to="/">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
