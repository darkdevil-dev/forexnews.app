import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogPosts";

export function BlogSection() {
  const featuredPosts = BLOG_POSTS.slice(0, 3);

  return (
    <section id="blog-guides" className="border-t border-border bg-background/50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Trading Guides & Research"
            title="Master Macroeconomic News & Risk Management"
            description="Deep, evidence-based frameworks for trading economic releases, calculating position sizes, and tracking major currencies."
            align="left"
          />
          <Link
            to="/blog"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-[13px] font-semibold text-foreground transition-colors hover:border-signal/50 hover:bg-muted"
          >
            <span>Explore All Guides</span>
            <ArrowRight className="h-4 w-4 text-signal" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-signal/40 hover:shadow-lg hover:shadow-signal/5"
            >
              <div>
                <div className="flex items-center justify-between text-[11.5px] text-muted-foreground">
                  <span className="font-semibold uppercase tracking-wider text-signal">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono">
                    <Clock className="h-3 w-3" />
                    {post.readingTime}
                  </span>
                </div>

                <h3 className="mt-3 text-[17px] font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-signal">
                  <Link to={`/blog/${post.slug}`} className="focus:outline-none">
                    {post.title}
                  </Link>
                </h3>

                <p className="mt-2.5 line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
              </div>

              <div className="mt-6 border-t border-border/50 pt-4">
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-signal transition-transform group-hover:translate-x-1"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

