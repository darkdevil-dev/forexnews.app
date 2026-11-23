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
  {
    path: "contact",
    title: "Contact Support & Inquiries",
    description: "Contact the Forex News team for technical support, economic calendar questions, calculator feature requests, and inquiries.",
  },
  {
    path: "delete-account",
    title: "Delete Account & Data Request",
    description: "Submit an account and data deletion request for the Forex News Android app under Google Play User Data privacy policies.",
  },
  {
    path: "delete-data",
    title: "Delete Account & Data Request",
    description: "Submit an account and data deletion request for the Forex News Android app under Google Play User Data privacy policies.",
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

  if (page.path === "delete-account" || page.path === "delete-data") {
    const deleteRootHtml = `
    <div id="root">
      <header style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.1);display:flex;justify-content:space-between;align-items:center;">
        <a href="/" style="font-weight:800;font-size:18px;text-decoration:none;color:#ffffff;"><span style="color:#f59e0b;">F</span>orex News</a>
        <a href="/" style="color:#a1a1aa;text-decoration:none;font-size:13px;">Back to App</a>
      </header>
      <main style="max-width:760px;margin:0 auto;padding:48px 20px;">
        <div style="display:inline-block;padding:4px 12px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.25);border-radius:9999px;font-size:11px;font-weight:700;color:#f59e0b;text-transform:uppercase;margin-bottom:16px;">Google Play Data Deletion</div>
        <h1 style="font-size:32px;font-weight:800;color:#ffffff;line-height:1.15;margin-bottom:16px;">Request Account &amp; User Data Deletion</h1>
        <p style="font-size:15px;color:#a1a1aa;line-height:1.6;margin-bottom:20px;">Under Google Play User Data policies, users of the <strong>Forex News</strong> Android application (package: <code>com.forexnews.app</code>) have the right to request the complete and permanent deletion of their account records, notification subscriptions, and all associated personal data.</p>
        <p style="font-size:14px;color:#a1a1aa;line-height:1.6;margin-bottom:24px;">Forex News operates on an offline-first architectural model. We do not require account creation, password management, or brokerage logins to access real-time economic calendar events or any of the 16 professional trading calculators. However, if you have enabled push notifications or communicated with our support desk, certain identifier data may be held on our servers.</p>
        
        <section style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px;margin-bottom:24px;">
          <h2 style="font-size:18px;font-weight:700;color:#ffffff;margin-bottom:12px;">Data Eligible for Permanent Deletion</h2>
          <ul style="color:#d4d4d8;font-size:14px;line-height:1.7;padding-left:20px;">
            <li><strong>Push Notification Tokens:</strong> Anonymous Firebase Cloud Messaging (FCM) registration tokens used to deliver pre-release economic event alerts to your mobile device.</li>
            <li><strong>Alert Preferences:</strong> Saved currency filters, event impact thresholds, and custom notification lead times (5, 15, 30, or 60 minutes).</li>
            <li><strong>Support Correspondence:</strong> Historical customer support inquiries, feedback submissions, bug reports, and email threads sent to our developer team.</li>
            <li><strong>Diagnostic Telemetry:</strong> Anonymous crash analytics and device identifiers associated with your specific application installation.</li>
          </ul>
        </section>

        <section style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px;margin-bottom:24px;">
          <h2 style="font-size:18px;font-weight:700;color:#ffffff;margin-bottom:12px;">Data Retention &amp; Legal Compliance Timeline</h2>
          <p style="font-size:14px;color:#d4d4d8;line-height:1.7;margin-bottom:12px;">All verified data deletion requests are reviewed and permanently removed from our active databases and notification dispatch queues within 30 calendar days. Forex News does not store, retain, or process trading account credentials, order histories, bank details, or credit card information. Payments on Google Play are processed entirely by Google LLC.</p>
          <p style="font-size:14px;color:#d4d4d8;line-height:1.7;">Alternatively, simply uninstalling the application immediately invalidates your device token on the Firebase Cloud Messaging network.</p>
        </section>

        <section style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px;">
          <h2 style="font-size:18px;font-weight:700;color:#ffffff;margin-bottom:12px;">How to Submit a Deletion Request</h2>
          <p style="font-size:14px;color:#a1a1aa;line-height:1.6;margin-bottom:16px;">To submit an account or data deletion request, use the interactive web form on this page or email our privacy operations desk directly at <a href="mailto:hello@forexnews.app?subject=Account%20Deletion%20Request%20-%20Forex%20News" style="color:#f59e0b;text-decoration:underline;">hello@forexnews.app</a> with the subject line 'Account Deletion Request'.</p>
        </section>
      </main>
    </div>
    `;
    html = html.replace(/<div id="root">[\s\S]*?<\/div>\s*<!--/i, `${deleteRootHtml}\n\n    <!--`);
  } else if (page.path === "contact") {
    const contactRootHtml = `
    <div id="root">
      <header style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.1);display:flex;justify-content:space-between;align-items:center;">
        <a href="/" style="font-weight:800;font-size:18px;text-decoration:none;color:#ffffff;"><span style="color:#f59e0b;">F</span>orex News</a>
        <a href="/" style="color:#a1a1aa;text-decoration:none;font-size:13px;">Back to App</a>
      </header>
      <main style="max-width:760px;margin:0 auto;padding:48px 20px;">
        <div style="display:inline-block;padding:4px 12px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.25);border-radius:9999px;font-size:11px;font-weight:700;color:#f59e0b;text-transform:uppercase;margin-bottom:16px;">Support &amp; Inquiries</div>
        <h1 style="font-size:32px;font-weight:800;color:#ffffff;line-height:1.15;margin-bottom:16px;">Contact Forex News Support</h1>
        <p style="font-size:15px;color:#a1a1aa;line-height:1.6;margin-bottom:20px;">Welcome to the official support and communication hub for Forex News (<code>com.forexnews.app</code>). Whether you need assistance configuring high-impact economic calendar alerts, have questions about our 16 trading calculators, or want to suggest new currency pairs, our developer and quantitative team is ready to help.</p>

        <section style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px;margin-bottom:24px;">
          <h2 style="font-size:18px;font-weight:700;color:#ffffff;margin-bottom:12px;">Inquiries We Assist With</h2>
          <ul style="color:#d4d4d8;font-size:14px;line-height:1.7;padding-left:20px;">
            <li><strong>Economic Calendar Data &amp; Timing:</strong> Questions regarding Tier-1 macroeconomic releases, consensus forecasts, historical revisions, and time zone synchronizations across G10 and emerging currency markets.</li>
            <li><strong>Push Notification Troubleshooting:</strong> Assistance configuring high-priority background push delivery on modern Android devices, battery management whitelist settings, and notification sound customization.</li>
            <li><strong>Trading Calculator Guidance:</strong> Mathematical explanations and feature proposals for our 16 offline calculators, including Position Size, Pip Value, Margin, Risk-Reward, and Pivot Points.</li>
            <li><strong>Bug Reports &amp; App Diagnostics:</strong> Prompt reporting of crashes, interface rendering glitches, or latency delays on specific Android device models and OS versions.</li>
            <li><strong>Privacy, Account Deletion &amp; Data Rights:</strong> Official requests regarding data privacy, notification token purging, and Google Play compliance inquiries.</li>
            <li><strong>Partnerships &amp; Developer Relations:</strong> Inquiries from financial directories, trading educational platforms, and market data contributors.</li>
          </ul>
        </section>

        <section style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px;">
          <h2 style="font-size:18px;font-weight:700;color:#ffffff;margin-bottom:12px;">Support Hours &amp; Response Service Level Agreement (SLA)</h2>
          <p style="font-size:14px;color:#d4d4d8;line-height:1.7;margin-bottom:12px;">Our support desk monitors incoming tickets Monday through Friday during active London and New York market trading sessions. General questions and technical support tickets are answered within 24 to 48 business hours. Critical data discrepancies receive expedited priority review.</p>
          <p style="font-size:14px;color:#d4d4d8;line-height:1.7;">Submit your inquiry via the secure contact form on this page, or write directly to <a href="mailto:hello@forexnews.app" style="color:#f59e0b;text-decoration:underline;">hello@forexnews.app</a>. Download the latest version of the app on <a href="https://play.google.com/store/apps/details?id=com.forexnews.app" target="_blank" rel="noopener noreferrer" style="color:#f59e0b;text-decoration:underline;">Google Play</a>.</p>
        </section>
      </main>
    </div>
    `;
    html = html.replace(/<div id="root">[\s\S]*?<\/div>\s*<!--/i, `${contactRootHtml}\n\n    <!--`);
  } else if (page.path === "privacy") {
    const privacyRootHtml = `
    <div id="root">
      <header style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.1);display:flex;justify-content:space-between;align-items:center;">
        <a href="/" style="font-weight:800;font-size:18px;text-decoration:none;color:#ffffff;"><span style="color:#f59e0b;">F</span>orex News</a>
        <a href="/" style="color:#a1a1aa;text-decoration:none;font-size:13px;">Back to App</a>
      </header>
      <main style="max-width:760px;margin:0 auto;padding:48px 20px;">
        <div style="display:inline-block;padding:4px 12px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.25);border-radius:9999px;font-size:11px;font-weight:700;color:#f59e0b;text-transform:uppercase;margin-bottom:16px;">Legal Policy</div>
        <h1 style="font-size:32px;font-weight:800;color:#ffffff;line-height:1.15;margin-bottom:12px;">Privacy Policy &amp; Advertising SDK Disclosures</h1>
        <p style="font-size:13px;color:#a1a1aa;font-family:monospace;margin-bottom:24px;">Last updated: 23 November 2026 | Package: com.forexnews.app</p>
        <p style="font-size:15px;color:#a1a1aa;line-height:1.6;margin-bottom:24px;">Forex News (&quot;we&quot;, &quot;us&quot;) publishes the Forex News Android application and the website at forexnews.app. This policy sets out our data collection practices, push notification infrastructure, and third-party advertising monetization SDK disclosures in full compliance with Google Play Developer policies.</p>

        <section style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px;margin-bottom:24px;">
          <h2 style="font-size:18px;font-weight:700;color:#ffffff;margin-bottom:12px;">1. Information We Handle</h2>
          <p style="font-size:14px;color:#d4d4d8;line-height:1.7;margin-bottom:12px;">Forex News is engineered to function without account creation or login credentials. We never request your legal name, physical address, brokerage logins, or bank details. We handle limited technical data:</p>
          <ul style="color:#d4d4d8;font-size:14px;line-height:1.7;padding-left:20px;">
            <li><strong>App Diagnostics:</strong> Anonymous crash traces, device hardware model, Android OS build, and app version to fix crashes and maintain memory performance.</li>
            <li><strong>Alert Settings:</strong> User-selected currency filters, impact levels, and lead-time alert preferences stored locally on your device.</li>
            <li><strong>Notification Token:</strong> Anonymous Firebase Cloud Messaging (FCM) registration tokens used solely to dispatch real-time calendar alerts.</li>
            <li><strong>Advertising Identifiers:</strong> The Google Play Advertising ID (AAID) and technical device signals handled by our monetization partners as detailed below.</li>
          </ul>
        </section>

        <section style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px;margin-bottom:24px;">
          <h2 style="font-size:18px;font-weight:700;color:#ffffff;margin-bottom:12px;">2. Third-Party Advertising &amp; Monetization Partners</h2>
          <p style="font-size:14px;color:#d4d4d8;line-height:1.7;margin-bottom:14px;">To support our team and provide the Forex News economic calendar and 16 trading calculators as a free mobile service, we integrate authorized third-party advertising networks and mediation SDKs. These SDKs collect pseudonymous device parameters, the Google Play Advertising ID (AAID), coarse IP geolocation, and ad engagement metrics (impressions, clicks, and rewarded video completions):</p>
          <ul style="color:#d4d4d8;font-size:14px;line-height:1.7;padding-left:20px;">
            <li><strong>Google AdMob (Google LLC):</strong> Serves banner, native, and interstitial advertisements. Processes AAID, coarse IP location, device model, and fraud prevention telemetry. Privacy: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style="color:#f59e0b;text-decoration:underline;">Google Advertising Privacy</a>.</li>
            <li><strong>Unity Ads (Unity Technologies):</strong> Delivers mobile video and interactive advertisements, including optional user-initiated rewarded video sessions. Processes advertising identifiers, device model, language, and engagement metrics. Privacy: <a href="https://unity.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style="color:#f59e0b;text-decoration:underline;">Unity Privacy Policy</a>.</li>
            <li><strong>Unity LevelPlay / ironSource (Unity Technologies):</strong> Acts as our ad mediation platform, routing ad requests among multiple ad networks to maximize fill rates and prevent network errors. Processes device signals, network status, and mediation analytics. Privacy: <a href="https://unity.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style="color:#f59e0b;text-decoration:underline;">LevelPlay Privacy</a>.</li>
            <li><strong>Meta Audience Network (Meta Platforms, Inc.):</strong> Delivers targeted display and video ad inventory. Processes advertising identifiers, device specifications, and ad performance data. Privacy: <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" style="color:#f59e0b;text-decoration:underline;">Meta Privacy Policy</a>.</li>
          </ul>
        </section>

        <section style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px;margin-bottom:24px;">
          <h2 style="font-size:18px;font-weight:700;color:#ffffff;margin-bottom:12px;">3. User Advertising Controls &amp; Android Opt-Out</h2>
          <p style="font-size:14px;color:#d4d4d8;line-height:1.7;margin-bottom:12px;">You have full control over personalized advertising on your Android device. You can reset or delete your Advertising ID at any time:</p>
          <ul style="color:#d4d4d8;font-size:14px;line-height:1.7;padding-left:20px;">
            <li>Open your Android device <strong>Settings</strong> app.</li>
            <li>Go to <strong>Privacy &gt; Ads</strong> (or <strong>Google &gt; Ads</strong> on earlier Android versions).</li>
            <li>Select <strong>'Reset advertising ID'</strong> to disconnect past ad history, or select <strong>'Delete advertising ID'</strong> to prevent applications from reading your advertising identifier entirely.</li>
            <li>When deleted, ad networks cannot track your device across apps, and you will only receive contextual, non-personalized advertisements.</li>
          </ul>
        </section>

        <section style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px;">
          <h2 style="font-size:18px;font-weight:700;color:#ffffff;margin-bottom:12px;">4. Data Deletion Requests</h2>
          <p style="font-size:14px;color:#d4d4d8;line-height:1.7;margin-bottom:12px;">Under Google Play User Data policies, users can submit permanent data deletion requests via our online portal at <a href="/delete-account" style="color:#f59e0b;text-decoration:underline;">forexnews.app/delete-account</a> or by emailing our developer operations desk at <a href="mailto:hello@forexnews.app?subject=Privacy%20Inquiry%20-%20Forex%20News" style="color:#f59e0b;text-decoration:underline;">hello@forexnews.app</a>.</p>
        </section>
      </main>
    </div>
    `;
    html = html.replace(/<div id="root">[\s\S]*?<\/div>\s*<!--/i, `${privacyRootHtml}\n\n    <!--`);
  }

  const outDir = path.join(distDir, page.path);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");
  console.log(`Generated static page: dist/${page.path}/index.html`);
}

// 2. Generate Blog Index Page (/blog)
{
  const blogUrl = "https://forexnews.app/blog";
  const blogTitle = "Forex Trading Blog: Economic Calendar Alerts | Forex News";
  const blogDesc =
    "Forex News trading blog: In-depth guides on economic calendar alerts, position sizing calculators, and high-impact macro event trading strategies.";

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
        <h1 style="font-size:36px;font-weight:800;color:#ffffff;letter-spacing:-0.03em;">Forex Trading Blog: Economic News &amp; Calendar Analysis</h1>
        <p style="font-size:16px;color:#a1a1aa;line-height:1.6;margin:16px 0 16px;">Master macroeconomic event trading, real-time economic calendar alerts, risk management mathematics, and currency indicator strategies with free expert guides from Forex News.</p>
        <p style="font-size:14px;color:#a1a1aa;line-height:1.6;margin-bottom:36px;">Our team analyzes global macroeconomic releases, interest rate differentials across major central banks, and position sizing mathematics to help currency traders avoid slippage, manage portfolio drawdown, and trade with structured discipline.</p>
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
