import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, Rss, Smartphone } from "lucide-react";
import { CONTACT_EMAIL, PLAY_STORE_URL } from "@/lib/site";

const columns = [
  {
    title: "App",
    links: [
      { label: "What's inside", href: "/#features" },
      { label: "Event alerts", href: "/#alerts" },
      { label: "How it works", href: "/#how" },
      { label: "Questions", href: "/#faq" },
    ],
  },
  {
    title: "Calculators",
    links: [
      { label: "Position size", href: "/#calculators" },
      { label: "Pip value", href: "/#calculators" },
      { label: "Margin & leverage", href: "/#calculators" },
      { label: "All 16 tools", href: "/#calculators" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Risk Disclaimer", to: "/risk-disclaimer" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Google Play", href: PLAY_STORE_URL, external: true },
      { label: "Sitemap", href: "/sitemap.xml", external: true },
      { label: "llm.txt", href: "/llm.txt", external: true },
    ],
  },
];

const currencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "NZD"];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-12 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center">
              <span className="text-[19px] font-extrabold tracking-[-0.03em]">
                <span className="text-signal">F</span>
                <span className="text-white">orex News</span>
              </span>
            </div>
            <p className="mt-3 max-w-xs text-[12.5px] leading-relaxed text-white/45">
              Economic calendar, event alerts and trading calculators for forex - built for Android.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-block text-[12.5px] text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="lg:text-right">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
              Covers every major release
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-1.5 lg:justify-end">
              {currencies.map((c) => (
                <span
                  key={c}
                  className="grid h-8 w-10 place-items-center rounded-[7px] border border-white/10 bg-white/[0.04] font-mono text-[10px] text-white/60"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 border-b border-white/10 py-12 sm:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[12.5px] font-semibold text-white">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) =>
                  l.to ? (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-[12.5px] text-white/50 transition-colors hover:text-signal"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group inline-flex items-center gap-1 text-[12.5px] text-white/50 transition-colors hover:text-signal"
                      >
                        {l.label}
                        {l.external && (
                          <ArrowUpRight className="h-3 w-3 opacity-40 transition-opacity group-hover:opacity-100" />
                        )}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Featured on Directory Badges */}
        <div className="border-b border-white/10 py-7">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/40 mb-3.5">
            Featured on
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="https://twelve.tools"
              target="_blank"
              rel="dofollow noopener"
              className="inline-block transition-transform duration-200 hover:scale-[1.02]"
            >
              <img
                src="https://twelve.tools/badge0-white.svg"
                alt="Featured on Twelve Tools"
                width="200"
                height="54"
                className="h-[40px] sm:h-[44px] w-auto rounded-lg"
              />
            </a>
            <a
              href="https://dang.ai"
              target="_blank"
              rel="dofollow noopener"
              className="inline-block transition-transform duration-200 hover:scale-[1.02]"
            >
              <img
                src="https://assets.dang.ai/badges/dang-verified-dark.png"
                alt="Verified on DANG!"
                width="260"
                height="94"
                className="h-[40px] sm:h-[44px] w-auto rounded-lg"
              />
            </a>
            <a
              href="https://toolpilot.ai"
              target="_blank"
              rel="dofollow noopener"
              className="inline-block transition-transform duration-200 hover:scale-[1.02]"
            >
              <img
                src="https://www.toolpilot.ai/cdn/shop/files/f-b_690x151_crop_center.png"
                alt="Featured on ToolPilot"
                width="300"
                height="66"
                className="h-[40px] sm:h-[44px] w-auto rounded-lg border border-white/10"
              />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] text-white/30">© 2026 Forex News · forexnews.app</p>
          <div className="flex items-center gap-1.5">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get Forex News on Google Play"
              className="grid h-8 w-8 place-items-center rounded-[7px] border border-white/10 text-white/55 transition-colors hover:border-signal hover:text-signal"
            >
              <Smartphone className="h-3.5 w-3.5" strokeWidth={1.9} />
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label="Email Forex News"
              className="grid h-8 w-8 place-items-center rounded-[7px] border border-white/10 text-white/55 transition-colors hover:border-signal hover:text-signal"
            >
              <Mail className="h-3.5 w-3.5" strokeWidth={1.9} />
            </a>
            <a
              href="/sitemap.xml"
              aria-label="Site index"
              className="grid h-8 w-8 place-items-center rounded-[7px] border border-white/10 text-white/55 transition-colors hover:border-signal hover:text-signal"
            >
              <Rss className="h-3.5 w-3.5" strokeWidth={1.9} />
            </a>
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-[10px] leading-relaxed text-white/25">
          Trading foreign exchange carries a high level of risk and may not be suitable for every
          investor. Forex News is an information tool, does not provide investment advice and does
          not execute trades.
        </p>
      </div>
    </footer>
  );
}