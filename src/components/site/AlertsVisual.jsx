import { Bell, SlidersHorizontal } from "lucide-react";

export function AlertsVisual() {
  return (
    <div className="rounded-[12px] border border-border bg-muted p-3 sm:p-4">
      <div className="flex items-center justify-between px-1 pb-3">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-muted-foreground">
          Today
        </p>
        <span className="font-mono text-[9.5px] text-muted-foreground">2 alerts set</span>
      </div>

      <div className="rounded-[9px] border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-[6px] bg-foreground">
              <Bell className="h-3 w-3 text-signal" strokeWidth={2.2} />
            </span>
            <p className="text-[11.5px] font-semibold text-foreground">Forex News</p>
          </div>
          <span className="font-mono text-[9.5px] text-muted-foreground">now</span>
        </div>
        <p className="mt-4 text-[14.5px] font-bold leading-snug tracking-[-0.02em] text-foreground">
          USD · Non-Farm Payrolls in 15 minutes
        </p>
        <p className="mt-1.5 font-mono text-[10px] leading-relaxed text-muted-foreground">
          Forecast 185K · Previous 199K · High impact
        </p>
      </div>

      <div className="mt-3 rounded-[9px] border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.9} />
          <p className="text-[11.5px] font-semibold text-foreground">Alert preferences</p>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["5 min", "15 min", "30 min", "60 min"].map((t, i) => (
            <span
              key={t}
              className={`rounded-[6px] px-2.5 py-1 text-[10px] font-medium ${
                i === 1
                  ? "bg-signal text-black"
                  : "border border-border text-muted-foreground"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <p className="text-[10.5px] text-muted-foreground">High impact only</p>
          <span className="flex h-[17px] w-[30px] items-center rounded-full bg-foreground px-[3px]">
            <span className="ml-auto block h-[11px] w-[11px] rounded-full bg-signal" />
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-[9px] border border-border bg-card p-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
            Currencies
          </p>
          <p className="mt-1.5 text-[12px] font-medium text-foreground">USD · EUR · GBP</p>
        </div>
        <div className="rounded-[9px] border border-border bg-card p-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
            Next today
          </p>
          <p className="mt-1.5 text-[12px] font-medium text-foreground">3 releases</p>
        </div>
      </div>
    </div>
  );
}