import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock, Calendar, CheckCircle2 } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogPosts";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { SiteFooter } from "@/components/site/SiteFooter";
import { DownloadButton } from "@/components/site/DownloadButton";
import { usePageMeta } from "@/hooks/use-page-meta";

export function BlogListPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  usePageMeta({
    title: "Forex Trading Blog: Economic Calendar Alerts | Forex News",
    description:
      "Forex News trading blog: In-depth guides on economic calendar alerts, position sizing calculators, and high-impact macro event trading strategies.",
    canonicalPath: "/blog",
  });

  const categories = ["All", ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))];

  const filteredPosts =
    selectedCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <Link to="/" className="flex items-center">
            <span className="text-[19px] font-extrabold tracking-[-0.03em]">
              <span className="text-signal">F</span>
              <span className="text-foreground">orex News</span>
            </span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/"
              className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Back to App
            </Link>
            <ThemeToggle />
            <DownloadButton size="sm" className="hidden sm:inline-flex">
              Get App
            </DownloadButton>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-signal/20 bg-signal/10 px-3 py-1 text-[11px] font-semibold text-signal">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Forex Trading & Strategy Blog</span>
          </div>
          <h1 className="mt-4 text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-foreground">
            Forex Trading Blog: Economic News, Market Analysis & Trading Guides
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Master macroeconomic event trading, real-time economic calendar alerts, risk management
            mathematics, and currency indicator strategies with free expert guides from Forex News.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-border pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3.5 py-1.5 text-[12.5px] font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-foreground text-background shadow-sm"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-signal/40 hover:shadow-lg hover:shadow-signal/5"
            >
              <div>
                <div className="flex items-center justify-between gap-3 text-[11.5px] text-muted-foreground">
                  <span className="font-semibold uppercase tracking-wider text-signal">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 font-mono">
                      <Clock className="h-3 w-3" />
                      {post.readingTime}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono">
                      <Calendar className="h-3 w-3" />
                      {post.publishDate}
                    </span>
                  </div>
                </div>

                <h2 className="mt-4 text-[18px] font-bold leading-snug tracking-[-0.02em] text-foreground group-hover:text-signal transition-colors">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                  {post.description}
                </p>

                {/* Key Takeaways Preview */}
                <div className="mt-5 space-y-1.5 rounded-xl border border-border/60 bg-muted/30 p-3.5">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Core Insights
                  </p>
                  <ul className="space-y-1.5 text-[12px] text-foreground/80">
                    {post.takeaways.slice(0, 2).map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                <span className="font-mono text-[11px] text-muted-foreground">
                  By {post.author.name}
                </span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-[13px] font-semibold text-signal transition-transform group-hover:translate-x-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Global CTA Banner */}
        <section className="mt-20 rounded-2xl border border-border bg-gradient-to-br from-card to-muted/40 p-8 sm:p-12 text-center">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
            Live Economic Calendar on Android
          </span>
          <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold tracking-[-0.03em] text-foreground">
            Never miss high-impact news volatility again.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-muted-foreground">
            Get instant push alerts minutes before CPI, NFP, and Central Bank prints, paired with 16
            offline trading calculators. Zero noise, zero spam.
          </p>
          <div className="mt-6 flex justify-center">
            <DownloadButton size="lg">Download on Google Play</DownloadButton>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
