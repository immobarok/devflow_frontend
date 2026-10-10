import { Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const integrations = [
  { name: "Dropbox", icon: "https://cdn.simpleicons.org/dropbox", x: -440, y: 0 }, // Col 1 (Outer)
  
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma", x: -310, y: -50 }, // Col 2 (Middle)
  { name: "Slack", icon: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg", x: -310, y: 50 }, 
  
  { name: "Mailchimp", icon: "https://cdn.simpleicons.org/mailchimp", x: -170, y: -100 }, // Col 3 (Inner)
  { name: "Notion", icon: "https://cdn.simpleicons.org/notion", x: -170, y: 0 },
  { name: "Jira", icon: "https://cdn.simpleicons.org/jira", x: -170, y: 100 },
  
  { name: "Tether", icon: "https://cdn.simpleicons.org/tether", x: 170, y: -100 }, // Col 4 (Inner)
  { name: "Intercom", icon: "https://cdn.simpleicons.org/intercom", x: 170, y: 0 },
  { name: "Whatsapp", icon: "https://cdn.simpleicons.org/whatsapp", x: 170, y: 100 },
  
  { name: "Discord", icon: "https://cdn.simpleicons.org/discord", x: 310, y: -50 }, // Col 5 (Middle)
  { name: "Google Calendar", icon: "https://cdn.simpleicons.org/googlecalendar", x: 310, y: 50 },
  
  { name: "Zapier", icon: "https://cdn.simpleicons.org/zapier", x: 440, y: 0 }, // Col 6 (Outer)
];

const IntegrationsSection = () => {
  return (
    <section className="relative overflow-hidden px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      {/* Background subtle radial gradient */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[600px] w-[600px] sm:h-[800px] sm:w-[1000px] rounded-full bg-[#EF4671] opacity-[0.07] blur-[100px]" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2">
        <div className="h-[300px] w-[300px] rounded-full bg-[#EF4671] opacity-[0.1] blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <Badge
          variant="secondary"
          className="mb-6 inline-flex h-8 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-sm font-medium text-slate-700 shadow-sm"
        >
          <Lock className="size-3.5 text-slate-500" />
          Secure Platform
        </Badge>

        <h2 className="mb-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-[56px]">
          Secure, Seamless Integrations
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
          Connect DevFlow with the tools your team already uses — Slack, Figma,
          Google Calendar, Notion, and more — while keeping your data safe and
          private.
        </p>

        <div className="relative mx-auto h-[400px] w-full max-w-[1000px] sm:h-[500px]">
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            {/* Outer Ring */}
            <div className="absolute size-[220px] rounded-full bg-[#EF4671]/5 sm:size-[320px]" />
            {/* Middle Ring */}
            <div className="absolute size-[140px] rounded-full bg-[#EF4671]/10 sm:size-[200px]" />
            {/* Inner Ring Glow */}
            <div className="absolute size-[80px] rounded-full bg-[#EF4671]/20 sm:size-[120px]" />
            
            {/* Center Lock Box */}
            <div className="relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-b from-[#EF4671] to-[#D8325C] shadow-[0_8px_30px_rgba(239,70,113,0.4)] sm:size-20">
              <Lock className="size-7 text-white sm:size-9" />
            </div>
          </div>

          {/* Integration Pills - Desktop Absolute Positioning using Exact Math */}
          <div className="hidden h-full w-full lg:block">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2"
                style={{ marginLeft: `${integration.x}px`, marginTop: `${integration.y}px` }}
              >
                <div className="flex cursor-pointer items-center gap-3 rounded-full border border-slate-100 bg-white px-4 py-2.5 shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(15,23,42,0.08)]">
                  <img
                    src={integration.icon}
                    alt={`${integration.name} logo`}
                    className="size-5 object-contain"
                  />
                  <span className="text-sm font-semibold text-slate-700">
                    {integration.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Integration Pills - Mobile/Tablet Flex Wrap */}
          <div className="flex h-full w-full flex-wrap content-center justify-center gap-4 lg:hidden pt-32">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-full border border-slate-100 bg-white px-4 py-2 shadow-sm"
              >
                <img
                  src={integration.icon}
                  alt={`${integration.name} logo`}
                  className="size-4 object-contain"
                />
                <span className="text-xs font-semibold text-slate-700">
                  {integration.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;