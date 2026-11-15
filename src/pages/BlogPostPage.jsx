import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  Share2,
  ChevronRight,
  ShieldCheck,
  BookOpen,
  Download,
} from "lucide-react";
import { BLOG_POSTS } from "@/data/blogPosts";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { SiteFooter } from "@/components/site/SiteFooter";
import { DownloadButton } from "@/components/site/DownloadButton";
import { usePageMeta } from "@/hooks/use-page-meta";
import { PLAY_STORE_URL } from "@/lib/site";

function renderFormattedText(text) {
  if (!text) return null;

  // Tokenize regex for [label](url), **bold**, *italic*, and `code`
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+?)\*\*|\*([^*]+?)\*|`([^`]+?)`)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      const label = match[2];
      const href = match[3];
      const isInternal = href.startsWith("/") || href.startsWith("#");
      parts.push(
        <a
          key={`link-${match.index}`}
          href={href}
          {...(!isInternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="font-medium text-signal underline decoration-signal/30 underline-offset-2 transition-colors hover:decoration-signal"
        >
          {label}
        </a>
      );
    } else if (match[4]) {
      parts.push(
        <strong key={`bold-${match.index}`} className="font-bold text-foreground">
          {match[4]}
        </strong>
      );
    } else if (match[5]) {
      parts.push(
        <em key={`italic-${match.index}`} className="italic text-foreground/90">
          {match[5]}
        </em>
      );
    } else if (match[6]) {
      parts.push(
        <code
          key={`code-${match.index}`}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-[12.5px] text-signal"
        >
          {match[6]}
        </code>
      );
    } else {
      parts.push(match[0]);
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export function BlogPostPage() {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  usePageMeta({
    title: post ? `${post.seoTitle || post.title} | Forex News` : "Blog | Forex News",
    description: post ? post.description : "Forex News blog articles and trading guides.",
    canonicalPath: post ? `/blog/${post.slug}` : "/blog",
  });

  // Inject Article and Breadcrumbs JSON-LD schema dynamically
  useEffect(() => {
    if (!post) return;

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `https://forexnews.app/blog/${post.slug}#article`,
      "headline": post.title,
      "description": post.description,
      "datePublished": post.publishDate,
      "dateModified": post.modifiedDate || post.publishDate,
      "mainEntityOfPage": `https://forexnews.app/blog/${post.slug}`,
      "image": "https://forexnews.app/og-image.png",
      "author": {
        "@type": "Organization",
        "name": post.author.name,
        "url": "https://forexnews.app/",
      },
      "publisher": {
        "@type": "Organization",
        "name": "Forex News",
        "url": "https://forexnews.app/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://forexnews.app/apple-touch-icon.png",
        },
      },
      "keywords": post.keywords.join(", "),
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://forexnews.app/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://forexnews.app/blog",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": `https://forexnews.app/blog/${post.slug}`,
        },
      ],
    };

    const script1 = document.createElement("script");
    script1.type = "application/ld+json";
    script1.id = "schema-article";
    script1.text = JSON.stringify(articleSchema);
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.type = "application/ld+json";
    script2.id = "schema-breadcrumbs";
    script2.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script2);

    return () => {
      document.getElementById("schema-article")?.remove();
      document.getElementById("schema-breadcrumbs")?.remove();
    };
  }, [post]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedPosts = post ? BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2) : [];

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-5">
          <Link to="/" className="flex items-center">
            <span className="text-[19px] font-extrabold tracking-[-0.03em]">
              <span className="text-signal">F</span>
              <span className="text-foreground">orex News</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/blog"
              className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              ← All Guides
            </Link>
            <ThemeToggle />
            <DownloadButton size="sm" className="hidden sm:inline-flex">
              Get App
            </DownloadButton>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/blog" className="hover:text-foreground transition-colors">
            Blog
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate text-foreground/80 font-medium">{post.title}</span>
        </nav>

        {/* Title & Header */}
        <div className="mt-6 border-b border-border pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-signal/20 bg-signal/10 px-3 py-1 text-[11px] font-semibold text-signal">
            <span>{post.category}</span>
          </div>

          <h1 className="mt-4 text-[clamp(2.1rem,4.5vw,3.2rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-foreground">
            {post.title}
          </h1>

          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            {post.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/50 text-[12.5px] text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-signal" />
                <span className="font-semibold text-foreground">{post.author.name}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono">
                <Calendar className="h-3.5 w-3.5" />
                <span>{post.publishDate}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono">
                <Clock className="h-3.5 w-3.5" />
                <span>{post.readingTime}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12px] font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>{copied ? "Link Copied!" : "Share Article"}</span>
            </button>
          </div>
        </div>

        {/* Executive Takeaway / AI Capsule Box (GEO Optimization) */}
        <section
          aria-label="Executive Summary and Key Takeaways"
          className="mt-8 rounded-2xl border-2 border-signal/30 bg-signal/5 p-6 sm:p-8"
        >
          <div className="flex items-center gap-2 text-signal">
            <ShieldCheck className="h-5 w-5" />
            <h2 className="text-[15px] font-bold uppercase tracking-wider">
              Executive Summary & Key Takeaways
            </h2>
          </div>
          <p className="mt-3 text-[14.5px] leading-relaxed text-foreground font-medium">
            {renderFormattedText(post.summaryCapsule)}
          </p>
          <ul className="mt-4 space-y-2.5 text-[13.5px] text-foreground/90">
            {post.takeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                <span className="flex-1">{renderFormattedText(takeaway)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Table of Contents */}
        <nav
          aria-label="Table of Contents"
          className="mt-10 rounded-xl border border-border bg-card p-5"
        >
          <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            In this guide:
          </p>
          <ul className="mt-3 space-y-2 text-[13.5px]">
            {post.sections.map((section, idx) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-foreground/80 hover:text-signal hover:underline transition-colors flex items-center gap-2"
                >
                  <span className="font-mono text-[11px] text-muted-foreground">{idx + 1}.</span>
                  <span>{section.heading}</span>
                </a>
              </li>
            ))}
            {post.faqs && (
              <li>
                <a
                  href="#frequently-asked-questions"
                  className="text-foreground/80 hover:text-signal hover:underline transition-colors flex items-center gap-2"
                >
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {post.sections.length + 1}.
                  </span>
                  <span>Frequently Asked Questions</span>
                </a>
              </li>
            )}
          </ul>
        </nav>

        {/* Article Body Sections */}
        <article className="mt-12 space-y-12">
          {post.sections.map((section, idx) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-[22px] sm:text-[24px] font-bold tracking-[-0.025em] text-foreground border-b border-border/60 pb-3">
                {section.heading}
              </h2>

              <div className="prose prose-invert mt-5 max-w-none text-[15px] leading-relaxed text-foreground/85">
                {section.content.split("\n\n").map((para, pIdx) => {
                  const trimmed = para.trim();
                  if (!trimmed) return null;

                  // Render subheadings
                  if (trimmed.startsWith("### ")) {
                    return (
                      <h3
                        key={pIdx}
                        className="mt-8 mb-3 text-[19px] sm:text-[20px] font-bold text-foreground"
                      >
                        {renderFormattedText(trimmed.replace(/^###\s+/, ""))}
                      </h3>
                    );
                  }
                  if (trimmed.startsWith("#### ")) {
                    return (
                      <h4
                        key={pIdx}
                        className="mt-6 mb-2 text-[16px] sm:text-[17px] font-semibold text-foreground"
                      >
                        {renderFormattedText(trimmed.replace(/^####\s+/, ""))}
                      </h4>
                    );
                  }

                  // Render markdown table
                  if (trimmed.startsWith("|")) {
                    const rows = trimmed
                      .split("\n")
                      .map((r) => r.trim())
                      .filter((r) => r.length > 0);
                    const headerRow = rows[0]
                      .split("|")
                      .map((c) => c.trim())
                      .filter((c) => c.length > 0);
                    const bodyRows = rows
                      .slice(2)
                      .map((r) =>
                        r
                          .split("|")
                          .map((c) => c.trim())
                          .filter((c) => c.length > 0)
                      );

                    return (
                      <div key={pIdx} className="my-6 overflow-x-auto rounded-xl border border-border">
                        <table className="w-full text-left text-[13px]">
                          <thead className="border-b border-border bg-muted/50 font-semibold text-foreground">
                            <tr>
                              {headerRow.map((h, hIdx) => (
                                <th key={hIdx} className="px-4 py-3">
                                  {renderFormattedText(h)}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/60 text-muted-foreground">
                            {bodyRows.map((bRow, rIdx) => (
                              <tr key={rIdx} className="hover:bg-muted/30">
                                {bRow.map((cell, cIdx) => (
                                  <td key={cIdx} className="px-4 py-3 font-mono text-[12px]">
                                    {renderFormattedText(cell)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }

                  // Render numbered list
                  if (/^\d+\.\s+/.test(trimmed)) {
                    const items = trimmed.split("\n").filter((i) => i.trim().length > 0);
                    return (
                      <ol key={pIdx} className="my-4 space-y-2.5 pl-1">
                        {items.map((item, iIdx) => {
                          const match = item.match(/^(\d+)\.\s+(.*)$/s);
                          const num = match ? match[1] : iIdx + 1;
                          const itemText = match ? match[2] : item;
                          return (
                            <li key={iIdx} className="flex items-start gap-3 text-[14.5px] leading-relaxed">
                              <span className="mt-0.5 inline-grid h-5 w-5 shrink-0 place-items-center rounded bg-signal/15 font-mono text-[11px] font-bold text-signal">
                                {num}
                              </span>
                              <div className="flex-1">{renderFormattedText(itemText)}</div>
                            </li>
                          );
                        })}
                      </ol>
                    );
                  }

                  // Render bullet list
                  if (/^[-*]\s+/.test(trimmed)) {
                    const items = trimmed.split("\n").filter((i) => i.trim().length > 0);
                    return (
                      <ul key={pIdx} className="my-4 space-y-2.5 pl-2">
                        {items.map((item, iIdx) => (
                          <li key={iIdx} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                            <div className="flex-1">
                              {renderFormattedText(item.replace(/^[-*]\s+/, ""))}
                            </div>
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p key={pIdx} className="mb-4 leading-relaxed">
                      {renderFormattedText(trimmed)}
                    </p>
                  );
                })}
              </div>

              {/* In-Article Conversion Banner after Section 2 */}
              {idx === 1 && (
                <div className="my-10 rounded-2xl border border-signal/30 bg-gradient-to-r from-signal/10 via-card to-signal/5 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-signal">
                      Forex News App for Android
                    </span>
                    <h3 className="mt-1 text-[18px] font-bold text-foreground">
                      Calculate exact lot sizes before every high-impact release.
                    </h3>
                    <p className="mt-2 text-[13px] text-muted-foreground max-w-md">
                      Get 16 offline calculators including Position Size, Pip Value, and Margin directly on your phone.
                    </p>
                  </div>
                  <DownloadButton size="md" className="shrink-0">
                    Get Free App
                  </DownloadButton>
                </div>
              )}
            </section>
          ))}

          {/* Article-Specific FAQs */}
          {post.faqs && (
            <section id="frequently-asked-questions" className="scroll-mt-24 border-t border-border pt-10">
              <h2 className="text-[22px] font-bold text-foreground">Frequently Asked Questions</h2>
              <div className="mt-6 space-y-4">
                {post.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-[15px] font-bold text-foreground">{faq.question}</h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                      {renderFormattedText(faq.answer)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Author Bio Box */}
          <section className="mt-12 rounded-2xl border border-border bg-muted/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-signal/10 border border-signal/30 text-signal font-bold text-xl">
              FN
            </div>
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-signal">
                Published by
              </p>
              <h3 className="text-[17px] font-bold text-foreground">{post.author.name}</h3>
              <p className="text-[12.5px] text-muted-foreground">{post.author.role}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                {post.author.credentials}
              </p>
            </div>
          </section>
        </article>

        {/* Related Articles Matrix */}
        <section className="mt-16 border-t border-border pt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-bold text-foreground">Recommended Next Guides</h2>
            <Link to="/blog" className="text-[13px] font-semibold text-signal hover:underline">
              View all guides →
            </Link>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {relatedPosts.map((rPost) => (
              <Link
                key={rPost.slug}
                to={`/blog/${rPost.slug}`}
                className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-signal/40 hover:shadow-md"
              >
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-signal">
                  {rPost.category}
                </span>
                <h3 className="mt-2 text-[15px] font-bold text-foreground group-hover:text-signal transition-colors">
                  {rPost.title}
                </h3>
                <p className="mt-2 text-[12.5px] text-muted-foreground line-clamp-2">
                  {rPost.description}
                </p>
                <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{rPost.readingTime}</span>
                  <span className="font-semibold text-signal group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read guide →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

