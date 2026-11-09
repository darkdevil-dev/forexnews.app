import { LegalPage } from "@/components/legal/LegalPage";

const sections = [
  {
    h: "1. Trading carries substantial risk",
    p: [
      "Foreign exchange and leveraged products carry a high level of risk. Losses can exceed your initial deposit, and a large share of retail accounts lose money when trading. You should not trade with funds you cannot afford to lose.",
    ],
  },
  {
    h: "2. Forex News does not give advice",
    p: [
      "Forex News reports economic data and performs arithmetic. It does not provide signals, recommendations, predictions or investment advice, and no content in the app or on this website should be interpreted that way.",
    ],
  },
  {
    h: "3. Economic data is unpredictable",
    p: [
      "A scheduled release says what time a number is published, not what it will say or how a market will react. Prices can move sharply in either direction regardless of whether a release beats or misses its forecast, and liquidity can disappear around major events.",
    ],
  },
  {
    h: "4. Alerts are a convenience, not a guarantee",
    p: [
      "Push notifications depend on your device, network and operating system, and may be delayed or fail to arrive. Never rely on an alert as the only safeguard for an open position.",
    ],
  },
  {
    h: "5. Calculator output is an estimate",
    p: [
      "Calculations use the inputs you provide and standard formulas. Your broker's contract specifications, leverage rules, spreads, commissions, financing charges and rounding conventions may produce different results.",
    ],
  },
  {
    h: "6. Third-party data",
    p: [
      "Calendar figures come from third-party sources and may be delayed, revised or incorrect. We are not responsible for errors in that data or for any decision made on the basis of it.",
    ],
  },
  {
    h: "7. Your responsibility",
    p: [
      "You are solely responsible for your own research, risk management and trading decisions, and for complying with the laws and regulations that apply to you in your jurisdiction.",
    ],
  },
  {
    h: "8. Contact",
    p: ["Questions about this disclaimer: hello@forexnews.app."],
  },
];

export function RiskPage() {
  return (
    <LegalPage
      eyebrow="Legal · Risk"
      title="Risk Disclaimer"
      updated="8 November 2026"
      intro="Forex News is a market information tool. Please read this before you use its calendar, alerts or calculators to make a trading decision."
      description="Risk disclaimer: Forex News is an economic calendar and calculation tool, not financial advice."
      canonicalPath="/risk-disclaimer"
      sections={sections}
    />
  );
}
