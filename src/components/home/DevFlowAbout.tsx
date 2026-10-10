
import {
  ArrowRight,
  Check,
  CheckCheck,
  MessageSquareText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const BRAND = "#EF4671";

function ChatPreview() {
  return (
    <Card className="h-full min-h-[430px] rounded-2xl border border-slate-100 bg-white shadow-[0_12px_45px_rgba(15,23,42,0.06)] sm:min-h-[510px]">
      <CardContent className="flex h-full flex-col gap-4 p-4 sm:gap-5 sm:p-6">
        <div>
          <span className="inline-flex rounded-full border border-slate-100 px-4 py-2 text-xs text-slate-600 sm:text-sm">
            Good Morning
          </span>
          <p className="mt-2 text-[10px] text-slate-400">08:34 AM</p>
        </div>

        <div className="max-w-[95%] rounded-[22px] rounded-tl-md border border-slate-100 p-3 sm:p-4">
          <p className="text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
            We've helped teams across industries streamline workflows,
            cut project delays, and hit milestones faster. And we're
            just getting started.
          </p>
        </div>

        <p className="text-[10px] text-slate-400">08:34 AM</p>

        <div
          className="ml-auto max-w-[95%] rounded-[22px] rounded-tr-md p-3 text-white sm:p-4"
          style={{ backgroundColor: BRAND }}
        >
          <p className="text-xs leading-5 sm:text-sm sm:leading-6">
            Hi team! Thanks for the update. I appreciate everyone's
            effort. Let's review our progress and get ready for the
            next milestone.
          </p>
        </div>

        <div className="flex justify-end gap-1 text-[10px] text-slate-400">
          <CheckCheck className="size-3.5 text-blue-500" />
          11:12 AM
        </div>

        <div className="max-w-[95%] rounded-[22px] rounded-tl-md border border-slate-100 p-3 sm:p-4">
          <p className="text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
            Great work, everyone 👋. What's our next priority?
          </p>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-1 text-[10px] text-slate-400">
          <span className="size-2 rounded-full bg-emerald-400" />
          Team conversation
        </div>
      </CardContent>
    </Card>
  );
}

function SuccessCard() {
  return (
    <Card className="absolute -bottom-5 left-3 right-3 z-10 rounded-2xl border-white bg-white shadow-[0_12px_40px_rgba(15,23,42,0.14)] sm:-bottom-5 sm:left-5 sm:right-5">
      <CardContent className="flex items-center flex-row gap-3 py-0 px-2 sm:gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 sm:size-12">
          <Check className="size-6 text-emerald-500" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-900 sm:text-sm">
            Successfully completed a task
          </p>
          <p className="mt-1 text-[11px] leading-4 text-slate-500 sm:text-xs sm:leading-5">
            Your project is moving forward right on schedule.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function TeamImage() {
  return (
    <div className="relative mx-auto w-full max-w-[440px] h-full pb-5">
      <div className="relative h-full min-h-[430px] sm:min-h-[510px] overflow-hidden rounded-lg bg-slate-100 sm:rounded-2xl">
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85"
          alt="Colleagues collaborating on a project"
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      <SuccessCard />
    </div>
  );
}

export default function DevFlowAbout() {
  return (
    <section className="overflow-hidden px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-7xl md:items-stretch items-center gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-[0.82fr_0.95fr_1.25fr] lg:gap-10 xl:gap-12">

        {/* Left: Team conversation preview */}
        <div className="order-2 md:col-span-1 lg:order-1 h-full">
          <ChatPreview />
        </div>

        {/* Center: Team photo and floating success card */}
        <div className="order-1 md:col-span-1 lg:order-2 h-full">
          <TeamImage />
        </div>

        {/* Right: About DevFlow */}
        <div className="order-3 md:col-span-2 lg:col-span-1 h-full flex flex-col justify-center">
          <div className="max-w-2xl lg:pl-1">
            <div
              className="mb-6 inline-flex items-center gap-3 text-sm font-semibold"
              style={{ color: BRAND }}
            >
              <MessageSquareText className="size-5" />
              <span>More about DevFlow</span>
            </div>

            <h2 className="text-3xl font-bold leading-[1.16] tracking-tight text-slate-950 sm:text-4xl lg:text-[42px] xl:text-[48px]">
              See How DevFlow Has Grown With Teams Like Yours
            </h2>

            <p className="mt-6 text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
              From small startups to growing organizations, DevFlow
              helps teams manage projects, deliver results, and
              celebrate success together. Bring tasks, collaboration,
              and progress tracking into one simple workspace.
            </p>

            <Button
               className="bg-[#EF4671] hover:bg-[#D8325C] text-white px-7 h-12 text-sm font-semibold rounded-2xl shadow-lg shadow-[#EF4671]/20 mt-4"
              onClick={() => {
                document
                  .getElementById("get-started")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get started now
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
