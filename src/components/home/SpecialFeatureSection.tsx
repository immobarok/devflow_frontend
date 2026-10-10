import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SpecialFeatureSection() {
  return (
    <section className="overflow-hidden bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="container mx-auto">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          
          {/* Left Column: Text */}
          <div className="max-w-xl">
            <Badge
              className="mb-6 border-0 bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-100"
            >
              Features
            </Badge>

            <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-[56px]">
              Our Special<br />Feature for you
            </h2>

            <p className="max-w-lg text-base leading-relaxed text-slate-500 sm:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hac
              luctus eget etiam ac nulla sit elementum a.
            </p>
          </div>

          {/* Right Column: Graphic */}
          <div className="relative h-[400px] w-full lg:h-[450px]">
            {/* Sparkle Icon */}
            <div className="absolute right-0 top-0 hidden lg:block">
              <Sparkles className="size-8 text-slate-800" />
            </div>

            {/* Vertical Blue Line */}
            <div className="absolute bottom-0 left-1/2 top-10 w-px -translate-x-1/2 bg-blue-400">
              <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full bg-blue-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                W 10
              </div>
            </div>

            {/* Stacked Cards */}
            <div className="absolute left-1/2 top-20 flex w-full max-w-[380px] -translate-x-1/2 flex-col gap-6 sm:max-w-[420px]">
              {/* Card 1 */}
              <div className="z-10 ml-0 mr-8 rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(20,20,40,0.06)] transition-transform hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[15px] font-semibold text-slate-900">New Feature Update</h3>
                    <p className="mt-1 text-[11px] font-medium text-slate-400">Dec 8 - Dec 12</p>
                  </div>
                  <div className="flex -space-x-2">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="size-6 rounded-full border-2 border-white bg-slate-100" alt="Avatar" />
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" className="size-6 rounded-full border-2 border-white bg-slate-100" alt="Avatar" />
                    <div className="flex size-6 items-center justify-center rounded-full border-2 border-white bg-slate-800 text-[9px] font-bold text-white">+2</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-1.5 w-16 gap-0.5">
                      {[1,2,3,4,5,6,7].map(i => <div key={i} className="h-full w-full rounded-sm bg-orange-500" />)}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">27%</span>
                  </div>
                </div>
              </div>

              {/* Card 2 (Offset Right) */}
              <div className="z-20 ml-12 -mt-4 rounded-2xl bg-white p-5 shadow-[0_15px_40px_rgba(20,20,40,0.08)] transition-transform hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[15px] font-semibold text-slate-900">Slicing From Design To Code</h3>
                    <p className="mt-1 text-[11px] font-medium text-slate-400">Dec 9 - Dec 14</p>
                  </div>
                  <div className="flex -space-x-2">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" className="size-6 rounded-full border-2 border-white bg-slate-100" alt="Avatar" />
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" className="size-6 rounded-full border-2 border-white bg-slate-100" alt="Avatar" />
                    <div className="flex size-6 items-center justify-center rounded-full border-2 border-white bg-slate-800 text-[9px] font-bold text-white">+3</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-1.5 w-20 gap-0.5">
                      {[1,2,3,4,5,6,7,8,9].map(i => <div key={i} className={`h-full w-full rounded-sm ${i > 7 ? 'bg-slate-100' : 'bg-blue-600'}`} />)}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">27%</span>
                  </div>
                  <Badge className="bg-indigo-50 text-indigo-600 hover:bg-indigo-50 border-0 rounded-full px-2.5 py-0.5 text-[10px]">
                    Front End
                  </Badge>
                </div>
              </div>

              {/* Card 3 (Offset Left) */}
              <div className="z-10 ml-0 mr-12 -mt-4 rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(20,20,40,0.06)] transition-transform hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[15px] font-semibold text-slate-900">Fixing Bugs Everywhere</h3>
                    <p className="mt-1 text-[11px] font-medium text-slate-400">Dec 10 - Dec 18</p>
                  </div>
                  <div className="flex -space-x-2">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" className="size-6 rounded-full border-2 border-white bg-slate-100" alt="Avatar" />
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" className="size-6 rounded-full border-2 border-white bg-slate-100" alt="Avatar" />
                    <div className="flex size-6 items-center justify-center rounded-full border-2 border-white bg-slate-800 text-[9px] font-bold text-white">+1</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-1.5 w-16 gap-0.5">
                      {[1,2,3,4,5,6,7].map(i => <div key={i} className={`h-full w-full rounded-sm ${i > 4 ? 'bg-slate-100' : 'bg-blue-600'}`} />)}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">27%</span>
                  </div>
                  <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 border-0 rounded-full px-2.5 py-0.5 text-[10px]">
                    Back End
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
