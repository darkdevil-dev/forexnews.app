# Forex News - Web Landing Page (forexnews.app)

The official landing page for **Forex News**, a fast Android application providing a global economic calendar, real-time event notifications, and 16 professional trading calculators.

## Tech Stack

- **Framework**: [React 19](https://react.dev) + [Vite](https://vitejs.dev)
- **Routing**: [React Router](https://reactrouter.com) v6
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)
- **Icons**: [Lucide React](https://lucide.dev)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: Radix UI primitives + custom design tokens
- **Hosting / Deployment**: Configured for instant deployment on [Vercel](https://vercel.com)

## Project Structure

```
forexnews/
├── index.html              # HTML entry point with theme detection & SEO meta
├── vercel.json             # Vercel SPA rewrite rules
├── vite.config.js          # Vite configuration with '@' alias
├── tailwind.config.js      # Custom theme colors, tokens, fonts & animations
├── public/
│   ├── robots.txt          # Production crawler directives
│   ├── sitemap.xml         # XML sitemap pointing to forexnews.app
│   ├── ads.txt             # Ad network authorizations
│   ├── app-ads.txt         # App ads authorization
│   └── llm.txt             # LLM discovery information
└── src/
    ├── main.jsx            # React root & BrowserRouter initialization
    ├── App.jsx             # Client-side routes (Home, Privacy, Terms, Risk, 404)
    ├── index.css           # Tailwind base styles and CSS variables
    ├── components/
    │   ├── site/           # Hero, Features, Alerts, Steps, Header, Footer, etc.
    │   ├── legal/          # LegalPage template for Privacy, Terms, and Risk
    │   └── ui/             # Reusable UI component library (buttons, dialogs, etc.)
    ├── pages/              # Route pages (HomePage, PrivacyPage, TermsPage, etc.)
    └── lib/                # Theme switcher, site metadata, and utilities
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Development

Install dependencies and start the local dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

Create an optimized static build in `dist/`:

```bash
npm run build
```

Preview the build locally:

```bash
npm run preview
```

## Deploy to Vercel

1. Push this repository to GitHub or GitLab.
2. Import the project into [Vercel](https://vercel.com/new).
3. Vercel automatically detects Vite:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy! The included `vercel.json` ensures all route paths (`/privacy`, `/terms`, `/risk-disclaimer`) route seamlessly to `index.html`.
