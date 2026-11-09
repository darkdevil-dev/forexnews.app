/**
 * Small typographic UI representations used inside feature cards.
 * Deliberately abstract - no screenshots, no calendar grids.
 */

export function CalendarVisual() {
  return (
    <div className="rounded-[9px] border border-border bg-muted p-3">
      <div className="flex flex-wrap gap-1">
        {["USD", "EUR", "GBP", "JPY", "AUD"].map((c) => (
          <span
            key={c}
            className="rounded-[4px] border border-border bg-card px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground"
          >
            {c}
          </span>
        ))}
      </div>
      <div className="mt-3 space-y-1.5">
        {[
          ["High", "Interest rate decision"],
          ["Medium", "Consumer confidence"],
          ["High", "Employment change"],
        ].map(([impact, label]) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                impact === "High" ? "bg-signal" : "bg-foreground/20"
              }`}
            />
            <span className="truncate text-[10px] text-muted-foreground">{label}</span>
            <span className="ml-auto font-mono text-[8.5px] text-muted-foreground/70">{impact}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AlertsVisual() {
  return (
    <div className="rounded-[9px] border border-border bg-muted p-3">
      <div className="rounded-[7px] border border-border bg-card p-2.5">
        <p className="text-[10.5px] font-semibold text-foreground">USD · release in 15 min</p>
        <p className="mt-1 font-mono text-[8.5px] text-muted-foreground">
          Forecast 185K · High impact
        </p>
      </div>
      <div className="mt-2 flex gap-1">
        {["5", "15", "30", "60"].map((t, i) => (
          <span
            key={t}
            className={`flex-1 rounded-[4px] py-1 text-center font-mono text-[8.5px] ${
              i === 1 ? "bg-signal text-black" : "border border-border bg-card text-muted-foreground"
            }`}
          >
            {t}m
          </span>
        ))}
      </div>
    </div>
  );
}

export function ConvertVisual() {
  return (
    <div className="rounded-[9px] border border-border bg-muted p-3">
      <div className="flex items-center justify-between rounded-[7px] border border-border bg-card px-2.5 py-2">
        <span className="font-mono text-[9.5px] text-muted-foreground">GBP</span>
        <span className="text-[11.5px] font-semibold text-foreground">10,000</span>
      </div>
      <div className="my-1.5 text-center font-mono text-[9px] text-muted-foreground/60">↓</div>
      <div className="flex items-center justify-between rounded-[7px] border border-border bg-card px-2.5 py-2">
        <span className="font-mono text-[9.5px] text-muted-foreground">USD</span>
        <span className="text-[11.5px] font-semibold text-foreground">12,684.40</span>
      </div>
    </div>
  );
}