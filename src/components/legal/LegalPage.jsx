import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { usePageMeta } from "@/hooks/use-page-meta";

export function LegalPage({
  eyebrow = "Legal",
  title,
  updated,
  intro,
  sections,
  canonicalPath,
  description,
}) {
  usePageMeta({
    title: `${title} | Forex News`,
    description: description || intro,
    canonicalPath: canonicalPath || window.location.pathname,
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5">
          <Link to="/" className="flex items-center">
            <span className="text-[19px] font-extrabold tracking-[-0.03em]">
              <span className="text-signal">F</span>
              <span className="text-foreground">orex News</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-[12.5px] text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Back to site
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
          {eyebrow}
        </p>
        <h1 className="mt-5 text-[clamp(1.9rem,4vw,2.6rem)] font-bold leading-[1.06] tracking-[-0.045em] text-foreground">
          {title}
        </h1>
        <p className="mt-3 font-mono text-[10.5px] text-muted-foreground">Last updated {updated}</p>
        <p className="mt-8 text-[14.5px] leading-relaxed text-foreground/75">{intro}</p>

        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-[16px] font-bold tracking-[-0.025em] text-foreground">{s.h}</h2>
              <div className="mt-3 space-y-3">
                {s.p?.map((para) => (
                  <p key={para.slice(0, 40)} className="text-[14px] leading-relaxed text-foreground/65">
                    {para}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-2 space-y-2">
                    {s.list.map((item) => (
                      <li
                        key={item.slice(0, 40)}
                        className="flex gap-2.5 text-[14px] leading-relaxed text-foreground/65"
                      >
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-signal" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-14 border-t border-border pt-6 text-[12.5px] leading-relaxed text-muted-foreground">
          Questions about this document? Write to{" "}
          <a
            href="mailto:hello@forexnews.app"
            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-signal"
          >
            hello@forexnews.app
          </a>
          .
        </p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {[
            { to: "/privacy", label: "Privacy" },
            { to: "/terms", label: "Terms" },
            { to: "/risk-disclaimer", label: "Risk disclaimer" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[12px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
