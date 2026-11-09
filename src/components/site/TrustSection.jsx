import { Database, Timer, Equal } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

const cards = [
  {
    icon: Database,
    title: "Sourced",
    body: "Every event carries the published forecast, previous and actual value, with a clear impact rating - no invented numbers.",
  },
  {
    icon: Timer,
    title: "On time",
    body: "Alerts are scheduled against the release itself, so the nudge arrives while it still matters.",
  },
  {
    icon: Equal,
    title: "Plain maths",
    body: "Each calculator shows its formula and the inputs. No black box, no signals, no advice.",
  },
];

export function TrustSection() {
  return (
    <section className="border-b border-border bg-muted">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <SectionHeading
          eyebrow="03 - Built to be relied on"
          title="A tool, not a guru."
          description="Forex News shows data and does arithmetic. It never tells you what to buy or sell."
        />
        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {cards.map((c) => (
            <div key={c.title} className="rounded-[12px] border border-border bg-card p-6">
              <span className="grid h-9 w-9 place-items-center rounded-[8px] bg-signal">
                <c.icon className="h-4 w-4 text-black" strokeWidth={2} />
              </span>
              <h3 className="mt-7 text-[15.5px] font-bold tracking-[-0.025em] text-foreground">
                {c.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}