import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import TrustedBySection from "./TrustedBySection"

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-background py-8">
      {/* Background patterns - Isometric Geometric Lines */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute right-0 top-0 h-full w-[80%] lg:w-[60%] opacity-[0.15] text-indigo-600 dark:text-indigo-400"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Subtle dashed grid lines */}
          <g stroke="currentColor" strokeWidth="1" strokeDasharray="4 2">
            <path d="M400,100 L700,250 L400,400 L100,250 Z" />
            <path d="M400,250 L700,400 L400,550 L100,400 Z" />
            <path d="M400,400 L700,550 L400,700 L100,550 Z" />

            <path d="M550,175 L850,325 L550,475 L250,325 Z" />
            <path d="M550,325 L850,475 L550,625 L250,475 Z" />

            <line x1="100" y1="250" x2="100" y2="550" />
            <line x1="400" y1="100" x2="400" y2="700" />
            <line x1="700" y1="250" x2="700" y2="550" />
            <line x1="250" y1="325" x2="250" y2="475" />
            <line x1="550" y1="175" x2="550" y2="625" />
            <line x1="850" y1="325" x2="850" y2="475" />
          </g>
          {/* Solid prominent lines */}
          <g stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8">
            <path d="M400,250 L550,325 L400,400 L250,325 Z" />
            <path d="M550,325 L700,400 L550,475 L400,400 Z" />
            <path d="M250,475 L400,550 L250,625 L100,550 Z" />

            <line x1="400" y1="400" x2="400" y2="550" />
            <line x1="550" y1="325" x2="550" y2="475" />
            <line x1="250" y1="475" x2="250" y2="625" />
          </g>
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Content */}
          <div className="max-w-2xl lg:-mt-12">
            <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold tracking-tight text-foreground leading-[1.1] mb-5">
              Manage Projects.<br />
              <span className="text-[#EF4671]">Hit Milestones.</span><br />
              Grow Faster.
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-[480px] leading-relaxed">
              Milestone helps teams plan, track, and deliver projects with clarity — from the first task to the final win.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Button asChild size="lg" className="bg-[#EF4671] hover:bg-[#D8325C] text-white px-7 h-12 text-sm font-semibold rounded-xl shadow-lg shadow-[#EF4671]/20">
                <Link to="/register">Get Started</Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="text-[#EF4671] hover:text-[#D8325C] hover:bg-[#EF4671]/10 px-5 h-12 text-sm font-semibold">
                <Link to="/demo">See How It Works</Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 text-xs md:text-sm font-bold text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-[#EF4671] text-white w-4 h-4 flex items-center justify-center text-[10px]">✓</div>
                <span>Free Register</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-[#EF4671] text-white w-4 h-4 flex items-center justify-center text-[10px]">✓</div>
                <span>Great Service</span>
              </div>
            </div>
          </div>

          {/* Right Content - Mockups */}
          <div className="relative h-[450px] lg:h-[600px] hidden md:block">

            {/* Revenue Card */}
            <div className="absolute top-[10%] right-[5%] bg-card text-card-foreground p-5 rounded-2xl shadow-xl shadow-black/5 border border-border/50 w-64 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 z-10 bg-white">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-[#A78BFA]"></div>
                <h3 className="font-bold text-xs text-foreground">Revenue</h3>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[22px] font-black">$36,680</span>
                <span className="text-[10px] text-indigo-500 font-bold bg-indigo-50 px-1.5 py-0.5 rounded">+12%</span>
              </div>
              <p className="text-[10px] text-muted-foreground font-medium">Compared to $28,000 Last Year</p>
            </div>

            {/* Tasks Completed Graph */}
            <div className="absolute top-[40%] left-[5%] bg-card text-card-foreground p-6 rounded-2xl shadow-xl shadow-black/5 border border-border/50 w-[320px] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 z-20 bg-white">
              <h3 className="font-bold text-sm mb-1">Tasks Completed</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-[22px] font-black">140</span>
                <span className="text-[10px] text-emerald-500 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">+14%</span>
              </div>
              {/* Fake bar chart */}
              <div className="flex items-end justify-between h-20 gap-2">
                <div className="w-full bg-slate-100 rounded-sm h-[30%] relative"><span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-muted-foreground">S</span></div>
                <div className="w-full bg-slate-100 rounded-sm h-[40%] relative"><span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-muted-foreground">M</span></div>
                <div className="w-full bg-slate-100 rounded-sm h-[20%] relative"><span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-muted-foreground">T</span></div>
                <div className="w-full bg-[#EF4671] rounded-sm h-[35%] relative"><span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-muted-foreground">W</span></div>
                <div className="w-full bg-[#EF4671] rounded-sm h-[80%] relative"><span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-muted-foreground">T</span></div>
                <div className="w-full bg-[#EF4671] rounded-sm h-[45%] relative"><span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-muted-foreground">F</span></div>
                <div className="w-full bg-slate-100 rounded-sm h-[25%] relative"><span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-muted-foreground">S</span></div>
              </div>
            </div>

            {/* Website Redesign Card */}
            <div className="absolute bottom-[5%] right-[10%] bg-card text-card-foreground p-6 rounded-2xl shadow-xl shadow-black/5 border border-border/50 w-64 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 z-30 bg-white">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex -space-x-2">
                  <img className="w-7 h-7 rounded-full border-2 border-white shadow-sm" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
                  <img className="w-7 h-7 rounded-full border-2 border-white shadow-sm" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" alt="avatar" />
                  <img className="w-7 h-7 rounded-full border-2 border-white shadow-sm bg-black" src="https://api.dicebear.com/7.x/initials/svg?seed=MB" alt="avatar" />
                </div>
              </div>
              <h3 className="font-bold text-sm mb-1">Website Redesign</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] font-bold text-muted-foreground">ACME Inc</span>
                <div className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px]">✓</div>
              </div>
              <div className="inline-flex px-3 py-1 bg-[#EF4671]/10 text-[#EF4671] rounded-full text-[10px] font-bold">
                UX Design
              </div>
            </div>

          </div>
        </div>
        <TrustedBySection />
      </div>
    </div>
  )
}
