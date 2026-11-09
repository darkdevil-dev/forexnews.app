import { SectionHeading } from "@/components/site/SectionHeading";
import { Calculator, TrendingUp, DollarSign, BarChart2, Percent, ArrowLeftRight } from "lucide-react";

const tools = [
  { icon: Calculator, label: "Position Size", desc: "Calculate the right lot size for your risk tolerance." },
  { icon: DollarSign, label: "Pip Value", desc: "Find the monetary value of a single pip move." },
  { icon: TrendingUp, label: "Profit & Loss", desc: "Estimate P&L before you place the trade." },
  { icon: Percent, label: "Margin & Leverage", desc: "Know your required margin at any leverage level." },
  { icon: ArrowLeftRight, label: "Currency Converter", desc: "Live-rate conversions between major pairs." },
  { icon: BarChart2, label: "Risk/Reward Ratio", desc: "Visualise your reward potential vs. your risk." },
];

export function ToolsSection() {
  return (
    <section id="calculators" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="16 Calculators"
          title="Every number you need before the trade"
          description="From position sizing to swap cost - all the maths, right inside the app."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-signal/10 text-signal">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-foreground">{label}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-[10.5px] text-muted-foreground">
          + 10 more tools inside the app - swap calculator, break-even, drawdown, Kelly criterion and beyond.
        </p>
      </div>
    </section>
  );
}
