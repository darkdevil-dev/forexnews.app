import { Calculator, ShieldCheck, Landmark } from "lucide-react";
import { cn } from "@/lib/utils";

const cards = [
  { label: "High impact", value: "6 events", note: "Scheduled today", dot: "bg-rose-500" },
  { label: "Market sessions", value: "2 active", note: "Asian · Tokyo", dot: "bg-emerald-500" },
  {
    label: "Central bank rates",
    value: "Fed · ECB · BOE",
    note: "Live policy rate decisions",
    icon: Landmark,
    tone: "bg-amber-500/10 text-amber-500",
  },
  { label: "Market sentiment", value: "NZD/USD", note: "59% long", bar: 59 },
  {
    label: "Prop-firm shield",
    value: "FTMO & funded",
    note: "Daily drawdown and lot size guard",
    icon: ShieldCheck,
    tone: "bg-violet-500/10 text-violet-500",
    pro: true,
  },
  {
    label: "Calculators",
    value: "16 tools",
    note: "Pip, margin, position size",
    icon: Calculator,
    tone: "bg-sky-500/10 text-sky-500",
  },
];

function GalleryCard({ card }) {
  const { label, value, note, dot, icon: Icon, tone, bar, pro } = card;

  return (
    <article className="w-[228px] shrink-0 rounded-2xl border border-border bg-card p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2">
        {Icon ? (
          <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-[7px]", tone)}>
            <Icon className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
        ) : (
          <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dot)} />
        )}
        <p className="truncate font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </p>
        {pro && (
          <span className="ml-auto rounded-full bg-signal px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-black">
            Pro
          </span>
        )}
      </div>

      <p className="mt-3 text-[18px] font-bold leading-none tracking-[-0.03em] text-foreground">
        {value}
      </p>
      <p className="mt-1.5 text-[11.5px] leading-snug text-muted-foreground">{note}</p>

      {bar != null && (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-rose-500/25">
          <div className="h-full rounded-full bg-emerald-500" style={{ width: `${bar}%` }} />
        </div>
      )}
    </article>
  );
}

function Half({ hidden }) {
  return (
    <div className="flex gap-3 pr-3" aria-hidden={hidden || undefined}>
      {cards.map((card) => (
        <GalleryCard key={card.label} card={card} />
      ))}
    </div>
  );
}

export function MotionGallery() {
  return (
    <section className="border-b border-border bg-background py-8">
      <div
        className="marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
        aria-label="What the app shows at a glance"
      >
        <div className="marquee-track flex w-max">
          <Half />
          <Half hidden />
        </div>
      </div>
    </section>
  );
}