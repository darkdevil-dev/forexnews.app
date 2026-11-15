import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BLOG_POSTS } from "../src/data/blogPosts.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");
const templatePath = path.join(distDir, "index.html");

if (!fs.existsSync(templatePath)) {
  console.error("dist/index.html not found. Run vite build first.");
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf-8");

// Standard static pages
const standardPages = [
  {
    path: "privacy",
    title: "Privacy Policy & Data Protection",
    description: "How Forex News handles data: privacy practices for the Forex News Android app and website.",
  },
  {
    path: "terms",
    title: "Terms of Service & User Agreement",
    description: "Terms of Service for the Forex News Android app and forexnews.app website.",
  },
  {
    path: "risk-disclaimer",
    title: "Financial Risk & Trading Disclaimer",
    description: "Risk disclaimer: Forex News is an economic calendar and calculation tool, not financial advice.",
  },
  {
    path: "refund-policy",
    title: "Refund Policy & Billing Guarantee",
    description: "Official Refund Policy for the Forex News Android app and forexnews.app website.",
  },
  {
    path: "refund",
    title: "Refund Policy & Billing Guarantee",
    description: "Official Refund Policy for the Forex News Android app and forexnews.app website.",
  },
];

function applyCommonMeta(html, title, description, url, options = {}) {
  const { ogType = "website", keywords = null } = options;
  let res = html;
  res = res.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);
  res = res.replace(/<meta name="title" content=".*?" \/>/i, `<meta name="title" content="${title}" />`);
  res = res.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${description}" />`);
  res = res.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${url}" />`);
  res = res.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${title}" />`);
  res = res.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${description}" />`);
  res = res.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${url}" />`);
  res = res.replace(/<meta property="og:type" content=".*?" \/>/i, `<meta property="og:type" content="${ogType}" />`);
  res = res.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${title}" />`);
  res = res.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${description}" />`);
  res = res.replace(/<meta name="twitter:url" content=".*?" \/>/i, `<meta name="twitter:url" content="${url}" />`);
  if (keywords) {
    if (res.includes('<meta name="keywords"')) {
      res = res.replace(/<meta name="keywords" content=".*?" \/>/i, `<meta name="keywords" content="${keywords}" />`);
    } else {
      res = res.replace("</head>", `  <meta name="keywords" content="${keywords}" />\n</head>`);
    }
  }
  return res;
}

function formatInline(text) {
  if (!text) return "";
  let res = text;
  // Markdown links: [anchor](url)
  res = res.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#f59e0b;text-decoration:underline;">$1</a>');
  // Bold: **text**
  res = res.replace(/\*\*([^*]+?)\*\*/g, '<strong style="color:#ffffff;font-weight:700;">$1</strong>');
  // Italic: *text*
  res = res.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>');
  // Code: `text`
  res = res.replace(/`([^`]+?)`/g, '<code style="background:rgba(255,255,255,0.08);padding:2px 6px;border-radius:4px;font-family:monospace;font-size:13px;color:#f59e0b;">$1</code>');
  return res;
}

function renderSectionBlocks(content) {
  const blocks = content.split("\n\n");
  return blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";

      // Subheadings
      if (trimmed.startsWith("### ")) {
        const title = trimmed.replace(/^###\s+/, "");
        return `<h3 style="font-size:19px;font-weight:700;color:#ffffff;margin:28px 0 12px;">${formatInline(title)}</h3>`;
      }
      if (trimmed.startsWith("#### ")) {
        const title = trimmed.replace(/^####\s+/, "");
        return `<h4 style="font-size:16px;font-weight:700;color:#ffffff;margin:20px 0 8px;">${formatInline(title)}</h4>`;
      }

      // Table parsing
      if (trimmed.startsWith("|")) {
        const rows = trimmed
          .split("\n")
          .map((r) => r.trim())
          .filter((r) => r.length > 0);
        if (rows.length >= 2) {
          const headerCells = rows[0]
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

          const thead = `<thead style="border-bottom:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.04);"><tr style="border-bottom:1px solid rgba(255,255,255,0.1);">${headerCells
            .map(
              (h) =>
                `<th style="padding:10px 14px;font-weight:700;color:#ffffff;text-align:left;">${formatInline(h)}</th>`
            )
            .join("")}</tr></thead>`;

          const tbody = `<tbody>${bodyRows
            .map(
              (row) =>
                `<tr style="border-bottom:1px solid rgba(255,255,255,0.06);">${row
                  .map(
                    (cell) =>
                      `<td style="padding:10px 14px;color:#d4d4d8;font-family:monospace;font-size:13px;">${formatInline(
                        cell
                      )}</td>`
                  )
                  .join("")}</tr>`
            )
            .join("")}</tbody>`;

          return `<div style="overflow-x:auto;margin:20px 0;border:1px solid rgba(255,255,255,0.1);border-radius:8px;"><table style="width:100%;border-collapse:collapse;text-align:left;font-size:14px;">${thead}${tbody}</table></div>`;
        }
      }

      // Numbered List
      if (/^\d+\.\s+/.test(trimmed)) {
        const items = trimmed.split("\n").map((i) => i.trim()).filter(Boolean);
        const listItems = items
          .map((item) => {
            const match = item.match(/^(\d+)\.\s+(.*)$/s);
            const num = match ? match[1] : "";
            const text = match ? match[2] : item;
            return `<li style="margin-bottom:10px;line-height:1.65;"><strong style="color:#f59e0b;">${num}.</strong> ${formatInline(text)}</li>`;
          })
          .join("");
        return `<ol style="padding-left:20px;margin:16px 0;color:#d4d4d8;list-style:none;">${listItems}</ol>`;
      }

      // Bullet List
      if (/^[-*]\s+/.test(trimmed)) {
        const items = trimmed.split("\n").map((i) => i.trim()).filter(Boolean);
        const listItems = items
          .map((item) => {
            const clean = item.replace(/^[-*]\s+/, "").trim();
            return `<li style="margin-bottom:8px;line-height:1.65;">${formatInline(clean)}</li>`;
          })
          .join("");
        return `<ul style="padding-left:24px;margin:16px 0;color:#d4d4d8;">${listItems}</ul>`;
      }

      // Standard paragraph
      return `<p style="margin-bottom:14px;line-height:1.7;">${formatInline(trimmed)}</p>`;
    })
    .filter(Boolean)
    .join("");
}

// 1. Generate Standard Pages
for (const page of standardPages) {
  const pageUrl = `https://forexnews.app/${page.path}`;
  const fullTitle = `${page.title} | Forex News`;

  let html = applyCommonMeta(template, fullTitle, page.description, pageUrl);

  const breadcrumbJson = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://forexnews.app/" },
        { "@type": "ListItem", position: 2, name: page.title, item: pageUrl },
      ],
    },
    null,
    2
  );

  const breadcrumbScript = `\n    <!-- Breadcrumbs Structured Data -->\n    <script type="application/ld+json">\n    ${breadcrumbJson}\n    </script>\n  </head>`;
  html = html.replace("</head>", breadcrumbScript);

  const outDir = path.join(distDir, page.path);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");
  console.log(`Generated static page: dist/${page.path}/index.html`);
}

// 2. Generate Blog Index Page (/blog)
{
  const blogUrl = "https://forexnews.app/blog";
  const blogTitle = "Forex Trading Guides & Calendar Research | Forex News";
  const blogDesc =
    "Deep guides on trading macroeconomic news releases, position sizing mathematics, and currency indicator analysis. Built by Forex News.";

  let html = applyCommonMeta(template, blogTitle, blogDesc, blogUrl);

  const blogSchema = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://forexnews.app/blog#collection",
      url: blogUrl,
      name: blogTitle,
      description: blogDesc,
      publisher: {
        "@type": "Organization",
        name: "Forex News",
        url: "https://forexnews.app/",
      },
    },
    null,
    2
  );

  const breadcrumbJson = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://forexnews.app/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: blogUrl },
      ],
    },
    null,
    2
  );

  const schemas = `\n    <script type="application/ld+json">\n    ${blogSchema}\n    </script>\n    <script type="application/ld+json">\n    ${breadcrumbJson}\n    </script>\n  </head>`;
  html = html.replace("</head>", schemas);

  // Pre-rendered semantic HTML for /blog
  const blogArticlesHtml = BLOG_POSTS.map(
    (p) => `
      <article style="padding:24px;margin-bottom:24px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;">
        <div style="font-size:12px;color:#f59e0b;font-weight:700;text-transform:uppercase;">${p.category} • ${p.readingTime}</div>
        <h2 style="font-size:22px;font-weight:700;margin:10px 0 8px;"><a href="/blog/${p.slug}" style="color:#ffffff;text-decoration:none;">${p.title}</a></h2>
        <p style="font-size:14px;color:#a1a1aa;line-height:1.6;">${p.description}</p>
        <p style="margin-top:12px;"><a href="/blog/${p.slug}" style="color:#f59e0b;font-weight:600;text-decoration:none;font-size:13px;">Read Full Guide &rarr;</a></p>
      </article>
    `
  ).join("");

  const blogRootHtml = `
    <div id="root">
      <header style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.1);display:flex;justify-content:space-between;align-items:center;">
        <a href="/" style="font-weight:800;font-size:18px;text-decoration:none;color:#ffffff;"><span style="color:#f59e0b;">F</span>orex News</a>
        <nav style="display:flex;gap:16px;">
          <a href="/" style="color:#a1a1aa;text-decoration:none;font-size:13px;">Home</a>
          <a href="/#calculators" style="color:#a1a1aa;text-decoration:none;font-size:13px;">Calculators</a>
          <a href="/blog" style="color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;">Blog</a>
        </nav>
      </header>
      <main style="max-width:860px;margin:0 auto;padding:48px 20px;">
        <h1 style="font-size:36px;font-weight:800;color:#ffffff;letter-spacing:-0.03em;">Forex Trading Guides &amp; Macroeconomic Research</h1>
        <p style="font-size:16px;color:#a1a1aa;line-height:1.6;margin:16px 0 16px;">Evidence-based guides on trading central bank announcements, high-impact economic news, and mathematical risk management.</p>
        <p style="font-size:14px;color:#a1a1aa;line-height:1.6;margin-bottom:36px;">Our quantitative research team analyzes global macroeconomic releases, interest rate differentials across major central banks, and position sizing mathematics to help currency traders avoid slippage, manage portfolio drawdown, and trade with structured discipline.</p>
        ${blogArticlesHtml}
      </main>
    </div>
  `;

  html = html.replace(/<div id="root">[\s\S]*?<\/div>\s*<!--/i, `${blogRootHtml}\n\n    <!--`);

  const outDir = path.join(distDir, "blog");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");
  console.log("Generated static page: dist/blog/index.html");
}

// 3. Generate Individual Blog Pages (/blog/:slug)
for (const post of BLOG_POSTS) {
  const postUrl = `https://forexnews.app/blog/${post.slug}`;
  const baseTitle = post.seoTitle || post.title;
  let fullTitle = baseTitle;
  if (baseTitle.length + 13 <= 60 && !baseTitle.includes("Forex News")) {
    fullTitle = `${baseTitle} | Forex News`;
  }

  let html = applyCommonMeta(template, fullTitle, post.description, postUrl, {
    ogType: "article",
    keywords: post.keywords ? post.keywords.join(", ") : null,
  });

  const articleSchema = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${postUrl}#article`,
      headline: post.title,
      description: post.description,
      datePublished: post.publishDate,
      dateModified: post.modifiedDate || post.publishDate,
      mainEntityOfPage: postUrl,
      image: "https://forexnews.app/og-image.png",
      inLanguage: "en-US",
      wordCount: post.wordCount,
      articleSection: post.category,
      author: {
        "@type": "Organization",
        name: post.author.name,
        url: "https://forexnews.app/",
      },
      publisher: {
        "@type": "Organization",
        name: "Forex News",
        url: "https://forexnews.app/",
        logo: {
          "@type": "ImageObject",
          url: "https://forexnews.app/apple-touch-icon.png",
        },
      },
      keywords: post.keywords.join(", "),
    },
    null,
    2
  );

  const breadcrumbJson = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://forexnews.app/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://forexnews.app/blog" },
        { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
      ],
    },
    null,
    2
  );

  const faqSchema =
    post.faqs && post.faqs.length > 0
      ? JSON.stringify(
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.answer,
              },
            })),
          },
          null,
          2
        )
      : null;

  let schemas = `\n    <script type="application/ld+json">\n    ${articleSchema}\n    </script>\n    <script type="application/ld+json">\n    ${breadcrumbJson}\n    </script>`;
  if (faqSchema) {
    schemas += `\n    <script type="application/ld+json">\n    ${faqSchema}\n    </script>`;
  }
  schemas += `\n  </head>`;
  html = html.replace("</head>", schemas);

  // Pre-rendered semantic HTML for article
  const sectionsHtml = post.sections
    .map(
      (s) => `
        <section id="${s.id}" style="margin-top:36px;">
          <h2 style="font-size:22px;font-weight:700;color:#ffffff;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:8px;">${s.heading}</h2>
          <div style="font-size:15px;color:#d4d4d8;line-height:1.7;margin-top:14px;">
            ${renderSectionBlocks(s.content)}
          </div>
        </section>
      `
    )
    .join("");

  const faqsHtml = post.faqs
    ? `
      <section style="margin-top:40px;border-top:1px solid rgba(255,255,255,0.1);padding-top:24px;">
        <h2 style="font-size:22px;font-weight:700;color:#ffffff;">Frequently Asked Questions</h2>
        ${post.faqs
          .map(
            (f) => `
          <div style="margin-top:18px;padding:16px;background:rgba(255,255,255,0.03);border-radius:10px;">
            <h3 style="font-size:16px;font-weight:700;color:#ffffff;">${f.question}</h3>
            <p style="font-size:14px;color:#a1a1aa;margin-top:6px;line-height:1.6;">${formatInline(f.answer)}</p>
          </div>
        `
          )
          .join("")}
      </section>
    `
    : "";

  const articleRootHtml = `
    <div id="root">
      <header style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.1);display:flex;justify-content:space-between;align-items:center;">
        <a href="/" style="font-weight:800;font-size:18px;text-decoration:none;color:#ffffff;"><span style="color:#f59e0b;">F</span>orex News</a>
        <nav style="display:flex;gap:16px;">
          <a href="/" style="color:#a1a1aa;text-decoration:none;font-size:13px;">Home</a>
          <a href="/blog" style="color:#a1a1aa;text-decoration:none;font-size:13px;">All Guides</a>
        </nav>
      </header>
      <main style="max-width:820px;margin:0 auto;padding:40px 20px;">
        <nav style="font-size:12px;color:#a1a1aa;margin-bottom:16px;">
          <a href="/" style="color:#a1a1aa;text-decoration:none;">Home</a> &rsaquo;
          <a href="/blog" style="color:#a1a1aa;text-decoration:none;">Blog</a> &rsaquo;
          <span style="color:#ffffff;">${post.title}</span>
        </nav>
        <article>
          <div style="font-size:12px;font-weight:700;color:#f59e0b;text-transform:uppercase;">${post.category} • ${post.readingTime}</div>
          <h1 style="font-size:34px;font-weight:800;color:#ffffff;line-height:1.15;letter-spacing:-0.03em;margin:12px 0 16px;">${post.title}</h1>
          <p style="font-size:16px;color:#a1a1aa;line-height:1.6;margin-bottom:28px;">${post.description}</p>
          
          <div style="padding:20px;background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.3);border-radius:12px;margin-bottom:32px;">
            <div style="font-size:13px;font-weight:800;color:#f59e0b;text-transform:uppercase;letter-spacing:0.05em;">Executive Summary &amp; Key Takeaways</div>
            <p style="font-size:14px;color:#ffffff;font-weight:500;line-height:1.6;margin:10px 0 12px;">${formatInline(post.summaryCapsule)}</p>
            <ul style="padding-left:18px;margin:0;font-size:13px;color:#d4d4d8;line-height:1.6;">
              ${post.takeaways.map((t) => `<li style="margin-bottom:6px;">${formatInline(t)}</li>`).join("")}
            </ul>
          </div>

          ${sectionsHtml}
          ${faqsHtml}

          <section style="margin-top:40px;border-top:1px solid rgba(255,255,255,0.1);padding-top:24px;display:flex;gap:16px;align-items:center;">
            <div style="width:48px;height:48px;border-radius:50%;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);color:#f59e0b;font-weight:700;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">FN</div>
            <div>
              <div style="font-size:11px;font-family:monospace;text-transform:uppercase;color:#f59e0b;font-weight:700;letter-spacing:0.05em;">Published by</div>
              <h3 style="font-size:16px;font-weight:700;color:#ffffff;margin:2px 0;">${post.author.name}</h3>
              <p style="font-size:12px;color:#f59e0b;margin:0 0 4px;font-weight:600;">${post.author.role}</p>
              <p style="font-size:13px;color:#a1a1aa;margin:0;line-height:1.5;">${post.author.credentials}</p>
            </div>
          </section>
        </article>
      </main>
    </div>
  `;

  html = html.replace(/<div id="root">[\s\S]*?<\/div>\s*<!--/i, `${articleRootHtml}\n\n    <!--`);

  const outDir = path.join(distDir, "blog", post.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");
  console.log(`Generated static page: dist/blog/${post.slug}/index.html`);
}

console.log("All static SEO pages (Legal + Blog + Articles) generated successfully.");
