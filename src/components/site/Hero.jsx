import { ArrowRight, BellRing, Calculator, CalendarDays } from "lucide-react";
import { Mark } from "@/components/site/Mark";
import { DownloadButton } from "@/components/site/DownloadButton";

const pillars = [
  { icon: CalendarDays, title: "Economic calendar", note: "Every release, every currency" },
  { icon: BellRing, title: "Event alerts", note: "Minutes before the print" },
  { icon: Calculator, title: "16 calculators", note: "Size, margin, pip value" },
];

export function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-12 pt-10 text-center sm:pb-24 sm:pt-24 lg:pt-28">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-signal/30 bg-signal/10 text-signal text-[11.5px] font-semibold tracking-wide uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
          Forex News App &bull; Live Economic Calendar 2027
        </div>

        <h1 className="mx-auto max-w-[19ch] text-[clamp(2.1rem,6.2vw,4.4rem)] font-bold leading-[1.06] tracking-[-0.04em] text-foreground">
          Know what's coming <Mark>before</Mark> the candle moves.
        </h1>

        <p className="mx-auto mt-4 sm:mt-6 max-w-lg text-[14px] leading-relaxed text-muted-foreground sm:text-[16px]">
          The global economic calendar, alerts that land before the release, and every trading
          calculator - in one fast Android app. No account, no noise, no signals.
        </p>

        <div className="mt-7 sm:mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row w-full max-w-md sm:max-w-none mx-auto">
          <DownloadButton size="lg" className="w-full sm:w-auto">
            Download for Android
          </DownloadButton>
          <a
            href="#alerts"
            className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-[9px] border border-border bg-card px-6 text-[14px] font-semibold text-foreground transition-colors hover:border-foreground/30 sm:w-auto"
          >
            How alerts work
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mx-auto mt-8 sm:mt-14 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-2.5 max-w-md sm:max-w-none">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-2 sm:py-2.5 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors hover:border-foreground/20"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[7px] bg-muted">
                <p.icon className="h-3.5 w-3.5 text-foreground/70" strokeWidth={1.9} />
              </span>
              <span className="leading-tight">
                <span className="block text-[12px] font-semibold text-foreground">{p.title}</span>
                <span className="mt-0.5 block text-[10.5px] text-muted-foreground">{p.note}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}