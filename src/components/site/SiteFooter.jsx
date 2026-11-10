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
      { label: "Refund Policy", to: "/refund-policy" },
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

function DirectoryBadgesList({ hidden }) {
  return (
    <div
      className="flex shrink-0 items-center gap-5 sm:gap-7 pr-5 sm:pr-7"
      aria-hidden={hidden || undefined}
    >
      <a
        href="https://twelve.tools"
        target="_blank"
        rel="dofollow noopener"
        className="inline-block shrink-0 transition-transform duration-200 hover:scale-[1.03]"
      >
        <img
          src="https://twelve.tools/badge0-white.svg"
          alt="Featured on Twelve Tools"
          width="200"
          height="54"
          className="h-[36px] sm:h-[40px] w-auto rounded-lg"
        />
      </a>
      <a
        href="https://dang.ai"
        target="_blank"
        rel="dofollow noopener"
        className="inline-block shrink-0 transition-transform duration-200 hover:scale-[1.03]"
      >
        <img
          src="https://assets.dang.ai/badges/dang-verified-dark.png"
          alt="Verified on DANG!"
          width="260"
          height="94"
          className="h-[36px] sm:h-[40px] w-auto rounded-lg"
        />
      </a>
      <a
        href="https://toolpilot.ai"
        target="_blank"
        rel="dofollow noopener"
        className="inline-block shrink-0 transition-transform duration-200 hover:scale-[1.03]"
      >
        <img
          src="https://www.toolpilot.ai/cdn/shop/files/f-b_690x151_crop_center.png"
          alt="Featured on ToolPilot"
          width="300"
          height="66"
          className="h-[36px] sm:h-[40px] w-auto rounded-lg border border-white/10"
        />
      </a>
      <a
        href="https://neeed.directory/products/forexnews-app?utm_source=forexnews-app"
        target="_blank"
        rel="noopener"
        className="inline-block shrink-0 transition-transform duration-200 hover:scale-[1.03]"
      >
        <img
          src="https://neeed.directory/badges/neeed-badge-light.svg"
          alt="Featured on neeed.directory"
          width="139"
          height="44"
          className="h-[36px] sm:h-[40px] w-auto rounded-lg"
        />
      </a>
      <a
        href="https://yo.directory"
        target="_blank"
        rel="dofollow noopener"
        className="inline-block shrink-0 transition-transform duration-200 hover:scale-[1.03]"
      >
        <img
          src="https://assets.yo.directory/badges/yo-directory-featured-dark.svg"
          alt="Featured on Yo.directory"
          width="260"
          height="94"
          className="h-[36px] sm:h-[40px] w-auto rounded-lg"
        />
      </a>
      <a
        href="https://startupfa.st"
        target="_blank"
        title="Powered by Startup Fast"
        className="inline-block shrink-0 transition-transform duration-200 hover:scale-[1.03]"
      >
        <img
          src="https://startupfa.st/images/badges/powered-by-light.svg"
          alt="Powered by Startup Fast"
          width="150"
          height="44"
          className="h-[36px] sm:h-[40px] w-auto rounded-lg"
        />
      </a>
      <a
        href="https://www.scrolllaunch.com/products/forexnews-app?ref=badge"
        target="_blank"
        rel="noopener"
        className="inline-block shrink-0 transition-transform duration-200 hover:scale-[1.03]"
      >
        <img
          src="https://www.scrolllaunch.com/api/badge/forexnews-app"
          alt="Featured on ScrollLaunch"
          width="220"
          height="48"
          className="h-[36px] sm:h-[40px] w-auto rounded-lg"
        />
      </a>
      <a
        href="https://auraplusplus.com/projects/forexnews-app"
        target="_blank"
        rel="noopener"
        title="View ForexNews.app on Aura++"
        className="inline-block shrink-0 transition-transform duration-200 hover:scale-[1.03]"
      >
        <img
          src="https://auraplusplus.com/images/badges/featured-on-light.svg"
          alt="Featured on Aura++"
          width="265"
          height="58"
          className="h-[36px] sm:h-[40px] w-auto rounded-lg"
        />
      </a>
      <a
        href="https://startupfa.me/s/forex-news?utm_source=forexnews.app"
        target="_blank"
        rel="noopener"
        className="inline-block shrink-0 transition-transform duration-200 hover:scale-[1.03]"
      >
        <img
          src="https://startupfa.me/badge?t=classic&theme=default"
          alt="ForexNews.app - Featured on Startup Fame"
          width="171"
          height="54"
          className="h-[36px] sm:h-[40px] w-auto rounded-lg"
        />
      </a>
      <a
        href="https://indiehunt.io/project/forexnews-app"
        target="_blank"
        rel="noopener"
        className="inline-block shrink-0 transition-transform duration-200 hover:scale-[1.03]"
      >
        <img
          src="https://indiehunt.io/badges/indiehunt-badge-light.svg"
          alt="Featured on IndieHunt"
          width="150"
          height="44"
          className="h-[36px] sm:h-[40px] w-auto rounded-lg"
        />
      </a>
      <a
        href="https://submitaitools.org/forexnews-app/"
        target="_blank"
        rel="noopener"
        className="inline-block shrink-0 transition-transform duration-200 hover:scale-[1.03]"
      >
        <img
          src="https://submitaitools.org/static_submitaitools/images/submitaitools.png"
          alt="forexnews.app"
          width="200"
          height="60"
          className="h-[36px] sm:h-[40px] w-auto rounded-lg"
        />
      </a>
      <a
        href="https://dofollow.tools"
        target="_blank"
        rel="dofollow noopener"
        className="inline-block shrink-0 transition-transform duration-200 hover:scale-[1.03]"
      >
        <img
          src="https://dofollow.tools/badge/badge_dark.svg"
          alt="Featured on Dofollow.Tools"
          width="153"
          height="44"
          className="h-[36px] sm:h-[40px] w-auto rounded-lg"
        />
      </a>
      <a
        href="https://deeplaunch.io"
        target="_blank"
        rel="dofollow noopener"
        className="inline-block shrink-0 transition-transform duration-200 hover:scale-[1.03]"
      >
        <img
          src="https://deeplaunch.io/badge/badge_dark.svg"
          alt="Featured on DeepLaunch.io"
          width="153"
          height="44"
          className="h-[36px] sm:h-[40px] w-auto rounded-lg"
        />
      </a>
      <a
        href="https://openhunts.com"
        target="_blank"
        rel="noopener"
        className="inline-block shrink-0 transition-transform duration-200 hover:scale-[1.03]"
      >
        <img
          src="https://cdn.openhunts.com/badges/club.webp"
          alt="OpenHunts Club Member"
          width="200"
          height="48"
          loading="lazy"
          className="h-[36px] sm:h-[40px] w-auto rounded-lg"
        />
      </a>
      <a
        href="https://domainrank.app"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block shrink-0 transition-transform duration-200 hover:scale-[1.03]"
      >
        <img
          src="https://domainrank.app/api/badge/forexnews.app?style=normal&theme=dark"
          alt="forexnews.app Domain Rating"
          width="360"
          height="80"
          className="h-[36px] sm:h-[40px] w-auto rounded-lg"
        />
      </a>
      <a
        href="https://acidtools.com/ai/forexnews"
        target="_blank"
        rel="noopener"
        className="inline-block shrink-0 transition-transform duration-200 hover:scale-[1.03]"
      >
        <img
          src="https://acidtools.com/assets/images/badge.png"
          alt="Acid Tools"
          height="54"
          loading="lazy"
          className="h-[36px] sm:h-[40px] w-auto rounded-lg"
        />
      </a>
      <a
        href="https://www.betterlaunch.co/product/forexnews"
        target="_blank"
        rel="noopener"
        className="inline-block shrink-0 transition-transform duration-200 hover:scale-[1.03]"
      >
        <img
          src="https://www.betterlaunch.co/badge-find-dark.svg"
          alt="Better Launch"
          width="200"
          height="56"
          loading="lazy"
          className="h-[36px] sm:h-[40px] w-auto rounded-lg"
        />
      </a>
      <a
        href="https://newtool.site/item/forexnewsapp?utm_source=forexnews.app"
        target="_blank"
        rel="noopener"
        className="inline-block shrink-0 transition-transform duration-200 hover:scale-[1.03]"
      >
        <img
          src="https://newtool.site/badges/newtool-light.svg"
          alt="Featured on NewTool.site"
          width="180"
          height="54"
          loading="lazy"
          className="h-[36px] sm:h-[40px] w-auto rounded-lg"
        />
      </a>
      <a
        href="https://ufind.best/products/forexnewsapp"
        target="_blank"
        rel="noopener"
        className="inline-block shrink-0 transition-transform duration-200 hover:scale-[1.03]"
      >
        <img
          src="https://ufind.best/badges/ufind-best-badge-light.svg"
          alt="Featured on ufind.best"
          width="150"
          height="44"
          loading="lazy"
          className="h-[36px] sm:h-[40px] w-auto rounded-lg"
        />
      </a>
      <a
        href="https://launchit.fast"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block shrink-0 transition-transform duration-200 hover:scale-[1.03]"
      >
        <img
          src="https://launchit.fast/img/launching.svg"
          alt="Launching soon on LaunchIt"
          width="200"
          height="54"
          loading="lazy"
          className="h-[36px] sm:h-[40px] w-auto rounded-lg"
        />
      </a>
      <div className="inline-flex shrink-0 flex-col items-center leading-none transition-transform duration-200 hover:scale-[1.03]">
        <a
          href="https://tools.launchllama.co?utm_source=badge&utm_medium=referral"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <img
            src="https://tools.launchllama.co/featured-badge.png?v=2"
            alt="Launch Llama Tools"
            width="200"
            height="52"
            className="h-[36px] sm:h-[40px] w-auto rounded-lg"
          />
        </a>
        <a
          href="https://mcpshelf.co/?utm_source=badge&utm_medium=referral"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 text-[8px] font-semibold tracking-wide text-white/40 hover:text-white transition-colors"
        >
          Launch your MCP
        </a>
      </div>
    </div>
  );
}

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

        {/* Featured on Directory Badges - Horizontal Auto Scrolling Single Row */}
        <div className="border-b border-white/10 py-6">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/40 mb-3.5">
            Featured on
          </p>
          <div
            className="marquee relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
            aria-label="Featured on directories carousel"
          >
            <div className="marquee-track flex w-max items-center py-1">
              <DirectoryBadgesList />
              <DirectoryBadgesList hidden />
            </div>
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