import { LegalPage } from "@/components/legal/LegalPage";

const sections = [
  {
    h: "1. Who we are",
    p: [
      "Forex News (\"we\", \"us\") publishes the Forex News Android application and the website at forexnews.app. This policy explains what information the app and this website handle, why, and what control you have over it.",
    ],
  },
  {
    h: "2. Information we handle",
    p: [
      "Forex News is built to work without an account. We do not ask for your name, brokerage credentials, trading account details or payment information.",
    ],
    list: [
      "App diagnostics: crash reports, device model, Android version and app version, used to keep the app stable.",
      "Alert preferences: the events, currencies and lead times you select for notifications. These are stored so your alerts keep firing.",
      "Notification token: a device identifier used only to deliver the alerts you asked for.",
      "Website analytics: aggregated page views and basic technical information such as approximate region and device type.",
    ],
  },
  {
    h: "3. What we never collect",
    list: [
      "Your brokerage account, positions, order history or funds.",
      "Your contacts, photos, messages or precise location.",
      "Payment card details - the app is downloaded through Google Play, which handles any billing itself.",
    ],
  },
  {
    h: "4. How we use information",
    p: [
      "We use the information above to deliver the calendar and alerts you configured, to diagnose faults and improve reliability, and to understand which parts of the product are used so we can improve them. We do not sell personal information, and we do not use it for advertising profiles.",
    ],
  },
  {
    h: "5. Notifications",
    p: [
      "Alerts are optional. Android asks for your permission before any push notification is shown, and you can turn alerts off inside the app or in Android settings at any time. Turning them off stops all event notifications.",
    ],
  },
  {
    h: "6. Third-party services",
    p: [
      "The app relies on a small number of service providers to operate: Google Play for distribution and updates, Google Firebase for crash reporting and push delivery, and market data providers for the economic calendar itself. These providers process data under their own privacy policies.",
    ],
  },
  {
    h: "7. Retention and security",
    p: [
      "Diagnostic data is kept for a limited period and then deleted or aggregated. Alert preferences remain on your device and are removed when you uninstall the app. Data in transit is encrypted using HTTPS, and access to our systems is restricted to people who need it to run the service.",
    ],
  },
  {
    h: "8. Your rights",
    p: [
      "Depending on where you live, you may have the right to access, correct, export or delete the personal information we hold about you, to object to certain processing, or to lodge a complaint with your local data protection authority. Write to hello@forexnews.app and we will respond within the period required by applicable law.",
    ],
  },
  {
    h: "9. Children",
    p: [
      "Forex News is intended for adults who trade or follow financial markets. It is not directed at children under 18, and we do not knowingly collect information from them.",
    ],
  },
  {
    h: "10. International transfers",
    p: [
      "Our service providers may process data in countries other than yours. Where that happens, we rely on the safeguards those providers offer for international transfers.",
    ],
  },
  {
    h: "11. Changes to this policy",
    p: [
      "If this policy changes in a material way we will update the date at the top of this page and, where appropriate, tell you inside the app.",
    ],
  },
  {
    h: "12. Contact",
    p: ["Data questions and requests: hello@forexnews.app."],
  },
];

export function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal · Privacy"
      title="Privacy Policy"
      updated="8 November 2026"
      intro="Forex News is an economic calendar app. It is designed to give you market information without collecting your trading identity - this page sets out exactly what it handles."
      description="How Forex News handles data: privacy practices for the Forex News Android app and forexnews.app website."
      canonicalPath="/privacy"
      sections={sections}
    />
  );
}
