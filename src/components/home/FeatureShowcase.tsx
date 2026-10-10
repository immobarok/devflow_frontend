
import type { ReactNode } from "react";
import {
    ArrowRight,
    Circle,
    CheckCircle2,
    Clock3,
    TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

const BRAND = "#EF4671";

type FeatureImageProps = {
    src: string;
    alt: string;
    children?: ReactNode;
};

type FeatureCopyProps = {
    label: string;
    title: string;
    description: string;
};

function TaskStatusCard() {
    const tasks = [
        { title: "In Progress", date: "Mon, Feb 28", status: "progress" },
        { title: "Completed", date: "Tue, Feb 21", status: "completed" },
        { title: "Overdue", date: "Tue, Feb 21", status: "overdue" },
    ];

    return (
        <div className="absolute -bottom-4 right-4 z-10 flex w-[220px] flex-col gap-1.5 sm:-bottom-6 sm:-right-6 sm:w-[240px] scale-90 sm:scale-75 origin-bottom-right">
            {tasks.map((task) => (
                <Card
                    key={task.title}
                    className="rounded-2xl border-white/80 bg-white/95 shadow-[0_8px_30px_rgba(20,20,40,0.08)] backdrop-blur w-full"
                >
                    <CardContent className="flex flex-row items-center gap-2.5 p-2.5 sm:p-3">
                        <div
                            className="flex size-7 shrink-0 items-center justify-center rounded-full"
                            style={{
                                color: BRAND,
                                backgroundColor:
                                    task.status === "completed" ? BRAND : "#fff0f4",
                            }}
                        >
                            {task.status === "completed" ? (
                                <CheckCircle2 className="size-4 text-white" />
                            ) : task.status === "progress" ? (
                                <Circle className="size-4 stroke-dashed" />
                            ) : (
                                <Clock3 className="size-4" />
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-slate-900">
                                {task.title}
                            </p>
                            <p className="text-xs text-slate-400 font-medium">{task.date}</p>
                        </div>

                        {task.status !== "progress" && (
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.status === "completed" ? "Felix" : "Aneka"}`}
                                alt="Assignee avatar"
                                className="size-6 shrink-0 rounded-full border border-white shadow-sm bg-slate-100 object-cover"
                            />
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function AnalyticsCard() {
    const bars = [35, 55, 43, 75, 48, 88, 62, 96, 68, 80];

    return (
        <Card className="absolute -bottom-5 -left-3 z-10 w-[72%] max-w-[270px] rounded-2xl border-white bg-white shadow-[0_16px_50px_rgba(20,20,40,0.12)] sm:-left-12 sm:-bottom-8">
            <CardContent className="p-4 sm:p-5">
                <div className="mb-4 flex items-start justify-between gap-2">
                    <div>
                        <p className="text-xs text-slate-500">Project performance</p>
                        <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                            13,256
                        </p>
                    </div>

                    <Badge className="border-0 bg-emerald-50 text-emerald-600 hover:bg-emerald-50">
                        <TrendingUp className="mr-1 size-3" />
                        +24%
                    </Badge>
                </div>

                <div className="flex h-[74px] items-end gap-1.5">
                    {bars.map((height, index) => (
                        <div
                            key={index}
                            className="flex-1 rounded-t-sm"
                            style={{
                                height: `${height}%`,
                                backgroundColor:
                                    index === 5 || index === 8 ? BRAND : "#e9e5f5",
                            }}
                        />
                    ))}
                </div>

                <div className="mt-3 flex items-center justify-between gap-2 text-[10px] text-slate-400">
                    <span>Last 10 weeks</span>
                    <span className="flex items-center gap-1">
                        <span
                            className="size-2 rounded-full"
                            style={{ backgroundColor: BRAND }}
                        />
                        Completed tasks
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}

function FeatureImage({ src, alt, children }: FeatureImageProps) {
    return (
        <div className="relative mx-auto w-full max-w-[440px] pb-10 pr-5 sm:pb-12 sm:pr-8">
            <div className="relative aspect-[4/4.8] overflow-hidden rounded-2xl bg-slate-100 sm:rounded-3xl">
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    className="size-full object-cover"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>

            {children}
        </div>
    );
}

function FeatureCopy({ label, title, description }: FeatureCopyProps) {
    return (
        <div className="group max-w-xl">
            <Badge
                variant="secondary"
                className="mb-6 border-0 px-4 py-2 text-sm font-medium"
                style={{ color: BRAND, backgroundColor: "#fceaf0" }}
            >
                {label}
            </Badge>

            <h2 className="text-3xl font-bold leading-[1.16] tracking-tight text-slate-950 sm:text-4xl lg:text-[46px]">
                {title}
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                {description}
            </p>

            <Button
                variant="link"
                className="mt-5 h-auto gap-2 p-0 text-base font-semibold hover:no-underline"
                style={{ color: BRAND }}
            >
                Learn More
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
        </div>
    );
}

export default function FeaturesShowcase() {
    return (
        <section className="overflow-hidden px-5 py-8 sm:px-8 lg:px-12 md:py-16">
            <div className="mx-auto max-w-6xl space-y-24 md:space-y-32 lg:space-y-40">

                {/* Feature 1: Image left, text right */}
                <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-24">
                    <FeatureImage
                        src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=85"
                        alt="Team collaborating on project tasks"
                    >
                        <TaskStatusCard />
                    </FeatureImage>

                    <FeatureCopy
                        label="Projects"
                        title="Track Tasks and Deadlines With Ease"
                        description="Stay on top of what's due, what's completed, and what's overdue. DevFlow helps your team stay accountable, organize priorities, and never miss important deadlines."
                    />
                </div>

                {/* Feature 2: Text left, image right */}
                <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-24">
                    <div className="order-2 md:order-1">
                        <FeatureCopy
                            label="Progress"
                            title="Visualize Progress in Real Time"
                            description="From individual tasks to entire projects, DevFlow gives you clear dashboards and insightful reports, so your team always knows where things stand."
                        />
                    </div>

                    <div className="order-1 md:order-2">
                        <FeatureImage
                            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85"
                            alt="Team members collaborating and reviewing progress"
                        >
                            <AnalyticsCard />
                        </FeatureImage>
                    </div>
                </div>

            </div>
        </section>
    );
}
