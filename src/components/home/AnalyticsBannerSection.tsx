import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AnalyticsBannerSection() {
  return (
    <div className="bg-white">
      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-32">
        <div className="container mx-auto">
          <div className="overflow-hidden rounded-[32px] bg-[#EF4671] p-8 sm:p-12 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              
              {/* Left Content */}
              <div className="max-w-xl text-white">
                <div className="mb-6 flex items-center gap-2 text-sm font-medium text-white/80">
                  <Sparkles className="size-4" />
                  Analytics and Reporting
                </div>
                
                <h2 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[56px]">
                  Grow Your Team.<br />Grow Your Projects.
                </h2>
                
                <p className="mb-10 text-base leading-relaxed text-white/80 sm:text-lg">
                  Track performance, monitor progress, and make smarter decisions
                  with real-time project analytics — all in one place.
                </p>
                
                <Button className="rounded-full bg-white px-6 py-6 text-base font-semibold text-slate-900 hover:bg-slate-50 hover:scale-105 transition-all">
                  Book a Demo
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </div>

              {/* Right Grid (Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Card 1: 90% (Row Span 2) */}
                <div className="flex flex-col rounded-3xl bg-white p-6 sm:row-span-2 shadow-lg hover:-translate-y-1 transition-transform">
                  <div className="mb-2 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">90%</div>
                  <p className="text-sm font-medium text-slate-500 mb-8">
                    Improving the efficiency of teamwork
                  </p>
                  
                  {/* Graph Graphic */}
                  <div className="relative mt-auto h-32 w-full">
                    <svg viewBox="0 0 100 50" className="absolute inset-0 h-full w-full overflow-visible text-green-500">
                      <defs>
                        <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Grid Lines */}
                      <line x1="10" y1="0" x2="10" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="36" y1="0" x2="36" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="63" y1="0" x2="63" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="90" y1="0" x2="90" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="2 2" />
                      
                      {/* Wave Line */}
                      <path d="M0,40 C15,35 25,5 45,25 C60,40 75,15 100,20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      
                      {/* Wave Fill */}
                      <path d="M0,40 C15,35 25,5 45,25 C60,40 75,15 100,20 L100,50 L0,50 Z" fill="url(#greenGrad)" />
                      
                      {/* Point Dots */}
                      <circle cx="27" cy="11" r="2.5" fill="#fff" className="stroke-green-500 stroke-2" />
                      <circle cx="73" cy="21" r="2.5" fill="#fff" className="stroke-green-500 stroke-2" />
                    </svg>
                  </div>
                </div>

                {/* Card 2: Team Payments */}
                <div className="rounded-3xl bg-white p-6 shadow-lg hover:-translate-y-1 transition-transform">
                  <h3 className="mb-1 text-[17px] font-bold text-slate-900">Team Payments</h3>
                  <p className="mb-5 text-[11px] font-medium text-slate-400">Approval 11 March, 2024</p>
                  
                  <div className="flex items-center -space-x-2">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tom" className="size-8 rounded-full border-2 border-white bg-slate-100" alt="Team" />
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lily" className="size-8 rounded-full border-2 border-white bg-slate-100" alt="Team" />
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sam" className="size-8 rounded-full border-2 border-white bg-slate-100" alt="Team" />
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mia" className="size-8 rounded-full border-2 border-white bg-slate-100" alt="Team" />
                    <div className="flex size-8 items-center justify-center rounded-full border-2 border-white bg-[#dcfce7] text-[11px] font-bold text-[#16a34a]">10+</div>
                  </div>
                </div>

                {/* Card 3: 500+ Business */}
                <div className="rounded-3xl bg-white p-6 shadow-lg hover:-translate-y-1 transition-transform">
                  <div className="mb-1 text-3xl font-bold tracking-tight text-slate-900">500+</div>
                  <p className="text-xs font-medium text-slate-500">Business already join us!</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
