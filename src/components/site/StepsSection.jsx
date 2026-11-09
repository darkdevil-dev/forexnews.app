import { Star, Clock3, BellRing } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Mark } from "@/components/site/Mark";

const steps = [
  {
    n: "01",
    icon: Star,
    title: "Choose what matters",
    body: "Star a single release, a whole currency, or only the high-impact prints. Everything else stays out of the way.",
  },
  {
    n: "02",
    icon: Clock3,
    title: "Pick your lead time",
    body: "Five, fifteen, thirty or sixty minutes before the number is published - you decide how much runway you want.",
  },
  {
    n: "03",
    icon: BellRing,
    title: "Get told, not surprised",
    body: "A push lands before volatility arrives. When you have nothing starred, the app simply stays silent.",
  },
];

export function StepsSection() {
  return (
    <section id="how" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <SectionHeading
          eyebrow="01 - Set up once"
          title={
            <>
              Set it up once, then <Mark>keep trading</Mark>.
            </>
          }
          description="Three steps and the calendar works for you instead of the other way round."
        />

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="group relative rounded-[12px] border border-border bg-card p-6 transition-colors duration-200 hover:border-signal"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-[8px] border border-border bg-background text-foreground transition-colors duration-200 group-hover:border-signal group-hover:bg-signal group-hover:text-black">
                  <s.icon className="h-4 w-4" strokeWidth={1.9} />
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">{s.n}</span>
              </div>
              <h3 className="mt-7 text-[15.5px] font-bold tracking-[-0.025em] text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}