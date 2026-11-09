import { Check } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { AlertsVisual } from "@/components/site/AlertsVisual";

const points = [
  "A push notification, not an inbox you forget to open",
  "Lead time from five minutes to an hour before the print",
  "Only the events you starred - the rest stays quiet",
];

export function AlertsSection() {
  return (
    <section id="alerts" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="02 - Alerts"
            title={
              <>
                Right where you already <span className="rounded-[3px] bg-signal px-[0.2em] text-black">look</span>.
              </>
            }
            description="The calendar is only useful if it reaches you in time. Forex News sends a notification before the release you care about - not after the candle has already moved."
          />
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[13px] leading-relaxed text-muted-foreground">
                <span className="mt-0.5 grid h-[17px] w-[17px] shrink-0 place-items-center rounded-[4px] bg-signal">
                  <Check className="h-2.5 w-2.5 text-black" strokeWidth={3.4} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <AlertsVisual />
      </div>
    </section>
  );
}