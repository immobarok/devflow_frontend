import {
  Activity,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Ellipsis,
  Layers3,
  ListTodo,
  TrendingUp,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

const pink = "#EF4671";

function ProgressPreview() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  const values = [70, 88, 62, 76, 91, 66, 54, 82, 72];

  return (
    <div className="relative h-[250px] overflow-hidden rounded-md bg-muted p-5 sm:h-[280px]">
      <div className="absolute inset-x-5 top-5 rounded-md border border-card bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-foreground">
            Tasks Statistics
          </span>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <span className="size-2 rounded-full" style={{ background: pink }} />
            Job Activity
          </span>
        </div>

        <div className="mt-7 flex h-[135px] items-end justify-between gap-2 border-b border-border px-1">
          {values.map((value, index) => (
            <div
              key={months[index]}
              className="flex h-full flex-1 flex-col items-center justify-end gap-1"
            >
              <div
                className="w-full max-w-5 rounded-full"
                style={{
                  height: `${value * 0.65}%`,
                  background: pink,
                }}
              />
              <div
                className="w-full max-w-5 rounded-full bg-[#ad98ed]"
                style={{ height: `${100 - value * 0.3}%` }}
              />
            </div>
          ))}
        </div>

        <div className="mt-2 flex justify-between text-[9px] text-muted-foreground">
          {months.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-md border border-card bg-card/95 px-3 py-2 shadow-md">
        <div className="flex size-9 items-center justify-center rounded-full bg-pink-50">
          <TrendingUp className="size-4" style={{ color: pink }} />
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">Progress</p>
          <p className="text-sm font-bold text-foreground">70%</p>
        </div>
      </div>
    </div>
  );
}

function OrganizationPreview() {
  return (
    <div className="relative h-[250px] overflow-hidden rounded-md bg-muted p-5 sm:h-[280px]">
      <div
        className="absolute left-10 right-[-15px] top-9 rounded-md p-5 text-white shadow-sm"
        style={{ background: pink }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Total Tasks</span>
          <Ellipsis className="size-5" />
        </div>
        <p className="mt-3 text-4xl font-bold">450</p>
        <p className="mt-1 text-xs text-white/80">
          Tasks across all projects
        </p>
      </div>

      <div className="absolute bottom-5 left-5 right-5 space-y-3">
        <div className="ml-auto max-w-[210px] rounded-md border border-border bg-card p-4 shadow-md">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-md bg-pink-50">
              <CalendarDays className="size-4" style={{ color: pink }} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Monthly Progress</p>
              <p className="text-xl font-bold text-foreground">82%</p>
            </div>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-secondary">
            <div
              className="h-full rounded-full"
              style={{ width: "82%", background: pink }}
            />
          </div>
        </div>

        <div className="ml-12 max-w-[185px] rounded-md border border-border bg-card p-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-md bg-violet-50">
              <ListTodo className="size-4 text-violet-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">New Tasks</p>
              <p className="text-xl font-bold text-foreground">8+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamPreview() {
  const members = [
    { name: "Howard Gilbert", role: "UI/UX Designer", project: "UI Kit Product", color: "bg-violet-100" },
    { name: "Leonard Lais", role: "Graphic Designer", project: "Mockup Cocard", color: "bg-emerald-100" },
    { name: "Camelia Arthon", role: "Project Manager", project: "Apply New Employee", color: "bg-rose-100" },
    { name: "Jamson Yoru", role: "Developer", project: "Develop Landing Page", color: "bg-sky-100" },
  ];

  return (
    <div className="h-[250px] overflow-hidden rounded-md bg-muted p-4 sm:h-[280px]">
      <div className="h-full overflow-hidden rounded-md border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Users className="size-4" style={{ color: pink }} />
            <span className="text-xs font-bold text-foreground">
              Team Progress
            </span>
          </div>
          <button className="flex items-center gap-1 text-[10px] text-muted-foreground">
            Last Year <ChevronDown className="size-3" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-[1.25fr_1fr] gap-2 border-b pb-2 text-[10px] text-muted-foreground">
          <span>Name</span>
          <span>Project</span>
        </div>

        <div className="space-y-4 pt-3">
          {members.map((member) => (
            <div
              key={member.name}
              className="grid grid-cols-[1.25fr_1fr] items-center gap-2"
            >
              <div className="flex min-w-0 items-center gap-2">
                <div
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full ${member.color}`}
                >
                  <Users className="size-3.5 text-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-semibold text-foreground">
                    {member.name}
                  </p>
                  <p className="truncate text-[9px] text-muted-foreground">
                    {member.role}
                  </p>
                </div>
              </div>
              <span className="truncate text-[10px] text-foreground">
                {member.project}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    title: "Track Progress With Clarity",
    description:
      "Get instant visibility into project timelines, task completion, and overall progress with powerful, easy-to-read dashboards.",
    preview: ProgressPreview,
    icon: Activity,
  },
  {
    title: "Organize Work Your Way",
    description:
      "Group tasks, milestones, and resources into clear categories, so nothing slips through the cracks and your team stays focused.",
    preview: OrganizationPreview,
    icon: Layers3,
  },
  {
    title: "Monitor Team Productivity",
    description:
      "See who's working on what, identify bottlenecks, and keep everyone aligned — without endless status meetings.",
    preview: TeamPreview,
    icon: Users,
  },
];

export default function FeaturesSection() {
  return (
    <section className="px-4 py-16 sm:py-20 lg:py-24 container mx-auto">
      <div className="mb-12 text-center sm:mb-16">
        <div
          className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold"
          style={{ color: pink, backgroundColor: "#fff0f4" }}
        >
          <CheckCircle2 className="size-4" />
          Everything Your Team Needs
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Every Project Deserves a{" "}
          <span style={{ color: pink }}>Milestone.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          From planning to delivery, DevFlow helps you track progress,
          celebrate wins, and keep your team moving forward.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, index) => {
          const Preview = feature.preview;
          const Icon = feature.icon;

          return (
            <Card
              key={feature.title}
              className="group overflow-hidden rounded-md border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:shadow-xl hover:shadow-pink-100/40 p-1!"
            >
              <CardContent className="p-4 sm:p-5">
                <Preview />

                <div className="px-1 pb-2 pt-7 text-center sm:px-2">
                  <div
                    className="mx-auto mb-4 flex size-10 items-center justify-center rounded-md transition-colors"
                    style={{
                      backgroundColor: "#fff0f4",
                      color: pink,
                    }}
                  >
                    <Icon className="size-5" />
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
