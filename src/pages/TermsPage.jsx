import { LegalPage } from "@/components/legal/LegalPage";

const sections = [
  {
    h: "1. Agreement",
    p: [
      "By downloading, installing or using the Forex News application or visiting forexnews.app, you agree to these terms. If you do not agree, please do not use the service.",
    ],
  },
  {
    h: "2. What the service is",
    p: [
      "Forex News is an information and calculation tool for people who follow financial markets. It displays economic calendar data, sends the alerts you configure, and performs trading arithmetic. It is not a broker, a trading platform, a signal service or a portfolio manager, and it never places orders on your behalf.",
    ],
  },
  {
    h: "3. Not financial advice",
    p: [
      "Nothing in the app or on this website is investment, financial, legal or tax advice, and nothing should be read as a recommendation to buy or sell any instrument. You are solely responsible for your trading decisions.",
    ],
  },
  {
    h: "4. Data accuracy",
    p: [
      "Calendar data is compiled from third-party sources and is provided as-is. Release times, forecasts and actual values can be revised, delayed or published incorrectly by the original source. Always confirm against a primary source before acting on any figure.",
    ],
  },
  {
    h: "5. Calculations",
    p: [
      "The calculators return estimates based on the numbers you enter. Broker rules, contract specifications, spreads, commissions, swap rates and rounding can all change the real figure. Treat the output as a working estimate, not a guarantee.",
    ],
  },
  {
    h: "6. Your licence to use the app",
    p: [
      "We grant you a personal, non-exclusive, non-transferable, revocable licence to use the app on devices you own or control, for your own non-commercial use. You may not copy, resell, sublicense, reverse-engineer or redistribute the app or its data feeds, or use automated means to scrape the calendar.",
    ],
  },
  {
    h: "7. Third-party services and stores",
    p: [
      "The app is distributed through Google Play, and its use is also subject to Google's terms. Market data and notification delivery depend on third-party providers whose availability we do not control.",
    ],
  },
  {
    h: "8. Availability and changes",
    p: [
      "We may add, change, suspend or discontinue features - including the calendar feed, alerts or individual calculators - at any time. We aim to keep the service available, but we do not guarantee uninterrupted access.",
    ],
  },
  {
    h: "9. Limitation of liability",
    p: [
      "To the fullest extent permitted by law, Forex News is not liable for any trading losses, lost profits, lost data or indirect or consequential loss arising from your use of, or inability to use, the app or this website - including any reliance on calendar data, alerts or calculator output.",
    ],
  },
  {
    h: "10. Intellectual property",
    p: [
      "The Forex News name, logo, interface and original content belong to us. Economic data remains the property of its respective providers. Nothing in these terms transfers ownership of that material to you.",
    ],
  },
  {
    h: "11. Termination",
    p: [
      "You may stop using the service at any time by uninstalling the app. We may suspend or end access where these terms are breached or where we are required to by law.",
    ],
  },
  {
    h: "12. Changes to these terms",
    p: [
      "We may update these terms from time to time. The date at the top of this page shows the current version, and continued use of the app after a change means you accept the updated terms.",
    ],
  },
  {
    h: "13. Contact",
    p: ["For anything related to these terms: hello@forexnews.app."],
  },
];

export function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal · Terms"
      title="Terms of Service"
      updated="8 November 2026"
      intro="These terms cover your use of the Forex News Android app and this website, including the limits of what the calendar, alerts and calculators can promise."
      description="Terms of Service for the Forex News Android app and forexnews.app website."
      canonicalPath="/terms"
      sections={sections}
    />
  );
}
