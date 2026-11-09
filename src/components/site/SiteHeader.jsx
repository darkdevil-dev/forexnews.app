import { useState } from "react";
import { Menu, X } from "lucide-react";
import { DownloadButton } from "@/components/site/DownloadButton";
import { ThemeToggle } from "@/components/site/ThemeToggle";

const links = [
  { label: "What's inside", href: "#features" },
  { label: "Alerts", href: "#alerts" },
  { label: "Calculators", href: "#calculators" },
  { label: "Questions", href: "#faq" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#top" className="flex shrink-0 items-center">
          <span className="text-[19px] sm:text-[20px] font-extrabold tracking-[-0.03em]">
            <span className="text-signal">F</span>
            <span className="text-foreground">orex News</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-[7px] px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DownloadButton size="sm" className="hidden sm:inline-flex">
            Get the app
          </DownloadButton>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-[8px] border border-border text-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-5 pb-5 pt-2 md:hidden">
          <nav className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 text-[14px] font-medium text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <DownloadButton size="md" className="mt-4 w-full" />
        </div>
      )}
    </header>
  );
}
