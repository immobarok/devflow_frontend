import { Outlet, Link } from "react-router"
import { Logo } from "@/components/logo/logo"
import { BarChart3, Users, Zap } from "lucide-react"

export default function AuthLayout() {
  return (
    <div className="flex min-h-svh font-sans">
      {/* Left Branding Panel */}
      <div className="relative hidden w-[45%] overflow-hidden bg-gradient-to-br from-[#EF4671] via-[#E23560] to-[#C42A50] lg:flex lg:flex-col">
        {/* Decorative Circles */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-white/[0.06]" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-[400px] w-[400px] rounded-full bg-white/[0.04]" />
        <div className="pointer-events-none absolute right-20 bottom-40 h-[200px] w-[200px] rounded-full bg-white/[0.05]" />

        {/* Logo */}
        <div className="relative z-10 p-10">
          <Link to="/" className="flex items-center gap-2.5">
            <Logo className="h-9 w-9 brightness-0 invert" />
            <span className="text-xl font-black tracking-tight text-white">DEVFLOW</span>
          </Link>
        </div>

        {/* Center Content */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-12 xl:px-16">
          <h2 className="mb-5 text-4xl font-bold leading-[1.15] tracking-tight text-white xl:text-[44px]">
            Manage projects<br />like never before.
          </h2>
          <p className="mb-12 max-w-sm text-base leading-relaxed text-white/70 xl:text-lg">
            Join thousands of teams who trust DevFlow to ship faster, stay aligned, and hit every deadline.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-sm">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
                <BarChart3 className="size-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Real-time Analytics</p>
                <p className="text-xs text-white/60">Track progress with live dashboards</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-sm">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
                <Users className="size-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Team Collaboration</p>
                <p className="text-xs text-white/60">Work together seamlessly in real-time</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-sm">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
                <Zap className="size-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Lightning Fast</p>
                <p className="text-xs text-white/60">Built for speed and efficiency</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Testimonial */}
        <div className="relative z-10 border-t border-white/10 px-12 py-8 xl:px-16">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tom" className="size-9 rounded-full border-2 border-white/30 bg-white/20" alt="" />
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lily" className="size-9 rounded-full border-2 border-white/30 bg-white/20" alt="" />
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sam" className="size-9 rounded-full border-2 border-white/30 bg-white/20" alt="" />
            </div>
            <div>
              <div className="flex gap-0.5 text-yellow-300">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="size-3.5 fill-current" viewBox="0 0 20 20"><path d="M10 1l2.39 6.04H19l-5.26 4.09L15.67 18 10 14.27 4.33 18l1.93-6.87L1 7.04h6.61z"/></svg>
                ))}
              </div>
              <p className="mt-1 text-xs text-white/60">Trusted by <span className="font-bold text-white/80">2,000+</span> teams worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white px-6 py-12">
        {/* Mobile Logo */}
        <div className="mb-10 lg:hidden">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="h-10 w-10" />
            <span className="text-2xl font-black tracking-tight text-slate-900">DEVFLOW</span>
          </Link>
        </div>

        <div className="w-full max-w-[420px]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
