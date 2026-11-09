import { Mark } from "@/components/site/Mark";
import { SectionHeading } from "@/components/site/SectionHeading";
import { AlertsVisual, CalendarVisual, ConvertVisual } from "@/components/site/CardVisual";

const cards = [
  {
    visual: <CalendarVisual />,
    title: "The whole economic calendar",
    body: "Rate decisions, employment, inflation, GDP and PMIs across the major economies - each with impact, forecast, previous and actual.",
  },
  {
    visual: <AlertsVisual />,
    title: "Alerts that arrive early",
    body: "Star the releases you trade and choose a lead time. The nudge lands before the print, not after the move.",
  },
  {
    visual: <ConvertVisual />,
    title: "Conversion built in",
    body: "Convert the pair you trade against your account currency, so every figure is already in the number you think in.",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <SectionHeading
          eyebrow="04 - What's inside"
          title={
            <>
              One app, <Mark>no tabs</Mark>.
            </>
          }
          description="Everything an active forex trader reaches for between releases - calm, quick and readable at a glance."
        />

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="rounded-[12px] border border-border bg-card p-3 transition-colors duration-200 hover:border-signal"
            >
              {c.visual}
              <div className="px-2 pb-2 pt-5">
                <h3 className="text-[15px] font-bold tracking-[-0.025em] text-foreground">
                  {c.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}