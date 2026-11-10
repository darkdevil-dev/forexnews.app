import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");
const templatePath = path.join(distDir, "index.html");

if (!fs.existsSync(templatePath)) {
  console.error("dist/index.html not found. Run vite build first.");
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf-8");

const pages = [
  {
    path: "privacy",
    title: "Privacy Policy",
    description: "How Forex News handles data: privacy practices for the Forex News Android app and website.",
  },
  {
    path: "terms",
    title: "Terms of Service",
    description: "Terms of Service for the Forex News Android app and forexnews.app website.",
  },
  {
    path: "risk-disclaimer",
    title: "Risk Disclaimer",
    description: "Risk disclaimer: Forex News is an economic calendar and calculation tool, not financial advice.",
  },
  {
    path: "refund-policy",
    title: "Refund Policy",
    description: "Official Refund Policy for the Forex News Android app and forexnews.app website.",
  },
  {
    path: "refund",
    title: "Refund Policy",
    description: "Official Refund Policy for the Forex News Android app and forexnews.app website.",
  },
];

for (const page of pages) {
  const pageUrl = `https://forexnews.app/${page.path}`;
  const fullTitle = `${page.title} | Forex News`;

  let html = template;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${fullTitle}</title>`);
  html = html.replace(/<meta name="title" content=".*?" \/>/i, `<meta name="title" content="${fullTitle}" />`);

  // Replace Description
  html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${page.description}" />`);

  // Replace Canonical
  html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${pageUrl}" />`);

  // Replace OG tags
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${fullTitle}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${page.description}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${pageUrl}" />`);

  // Replace Twitter tags
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${fullTitle}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${page.description}" />`);

  // Add BreadcrumbList structured data before </head>
  const breadcrumbJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://forexnews.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": page.title,
        "item": pageUrl
      }
    ]
  }, null, 2);

  const breadcrumbScript = `\n    <!-- Breadcrumbs Structured Data -->\n    <script type="application/ld+json">\n    ${breadcrumbJson}\n    </script>\n  </head>`;
  html = html.replace("</head>", breadcrumbScript);

  const outDir = path.join(distDir, page.path);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");
  console.log(`Generated static page: dist/${page.path}/index.html`);
}

console.log("All static SEO pages generated successfully.");

