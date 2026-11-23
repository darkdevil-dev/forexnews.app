import { LegalPage } from "@/components/legal/LegalPage";

const sections = [
  {
    h: "1. Who we are",
    p: [
      "Forex News (\"we\", \"us\") publishes the Forex News Android application (package: com.forexnews.app) and the official website at forexnews.app. This policy explains what information the app and website handle, why, and what privacy controls you have over your data.",
    ],
  },
  {
    h: "2. Information we handle",
    p: [
      "Forex News is built to operate without requiring user registration or account creation. We do not ask for your real name, email address, brokerage credentials, trading account numbers, or bank details.",
    ],
    list: [
      "App diagnostics: crash reports, device model, Android OS version, and app version, used to maintain application stability and performance.",
      "Alert preferences: custom economic events, currency pairs, and lead times you select. These preferences are stored locally on your device so your alerts fire accurately.",
      "Notification token: an anonymous Firebase Cloud Messaging (FCM) registration token used solely to route scheduled event alerts to your device.",
      "Advertising identifiers & device signals: pseudonymous identifiers such as the Google Play Advertising ID (AAID), coarse IP location, device model, and ad performance metrics processed by our third-party advertising partners (Google AdMob, Unity Ads, Unity LevelPlay, and Meta Audience Network) as detailed in Section 6.",
      "Website analytics: aggregated page views, referrer domains, and general technical parameters (such as browser type and approximate country).",
    ],
  },
  {
    h: "3. What we never collect",
    list: [
      "Your trading brokerage login credentials, open trading positions, order book history, or equity balances.",
      "Your personal contacts, address book, phone numbers, or text messages.",
      "Your photo gallery, camera, microphone, or storage files.",
      "Your precise GPS coordinates or real-time physical location.",
      "Credit card or banking payment details (in-app transactions or subscriptions, if any, are processed exclusively through Google Play Billing).",
    ],
  },
  {
    h: "4. How we use information",
    p: [
      "We use collected information to deliver real-time economic calendar events and custom alerts, diagnose technical crashes and memory leaks, improve application performance, and provide a sustainable free service through ad-supported monetization. We do not sell your personal data to data brokers.",
    ],
  },
  {
    h: "5. Notifications & User Controls",
    p: [
      "Economic calendar alerts are strictly optional. Android requires your explicit consent before push notifications can appear. You can configure granular lead times (5, 15, 30, or 60 minutes before the print) or disable notifications entirely at any time within the app settings or via Android system settings (Settings > Apps > Forex News > Notifications).",
    ],
  },
  {
    h: "6. Third-party services & Advertising SDKs",
    p: [
      "To keep the Forex News application free and continually updated with high-frequency macroeconomic data and 16 trading calculators, we integrate reputable third-party infrastructure and advertising SDK partners. These partners process information under their respective privacy policies.",
    ],
    subsections: [
      {
        h: "6.1 Core App Infrastructure & Push Notifications",
        list: [
          "Google Play Services (Google LLC): App distribution, automated update delivery, and platform integrity checks.",
          "Google Firebase Cloud Messaging & Crashlytics (Google LLC): Real-time push notification dispatch and anonymous crash diagnostics.",
          "Institutional Macroeconomic Feeds: Live economic calendar event schedules, consensus forecasts, and historical indicator revisions.",
        ],
      },
      {
        h: "6.2 Advertising & Monetization Partners (AdMob, Unity, LevelPlay, Meta)",
        p: [
          "Our mobile application integrates authorized third-party ad networks and mediation platforms to serve banner, interstitial, and optional rewarded video advertisements. These monetization SDKs may collect and process device telemetry, the Google Play Advertising ID (AAID), coarse IP geolocation (city/country level), and ad interaction events (impressions, clicks, and video completion rates):",
        ],
        list: [
          "Google AdMob (Google LLC): Serves mobile banner, native, and interstitial ads. Processes AAID, IP address, device specifications, and anti-fraud telemetry. Policy: https://policies.google.com/technologies/ads",
          "Unity Ads (Unity Technologies): Delivers mobile video and interactive ads, including optional user-initiated rewarded video sessions. Processes advertising identifiers, device model, language, and ad engagement metrics. Policy: https://unity.com/legal/privacy-policy",
          "Unity LevelPlay / ironSource (Unity Technologies): Acts as our ad mediation platform, intelligently routing ad requests across connected ad networks to optimize ad delivery and prevent blank ad spaces. Processes device signals, network status, and mediation analytics. Policy: https://unity.com/legal/privacy-policy",
          "Meta Audience Network (Meta Platforms, Inc.): Displays targeted display and video ad inventory. Processes advertising identifiers, general device information, and ad interaction signals in accordance with Meta privacy controls. Policy: https://www.facebook.com/privacy/policy/",
        ],
      },
      {
        h: "6.3 How to Opt Out of Personalized Ads on Android",
        p: [
          "You have direct control over personalized advertising on your Android device. You can reset or permanently delete your Google Advertising ID at any time:",
        ],
        list: [
          "Open your device Settings app.",
          "Navigate to Privacy > Ads (or Google > Ads on older Android versions).",
          "Tap 'Reset advertising ID' to disconnect past ad profiles, or tap 'Delete advertising ID' to prevent apps from accessing your identifier.",
          "When you delete your advertising ID, ad networks cannot track your device across applications, and you will receive only non-personalized or contextual advertisements.",
        ],
      },
    ],
  },
  {
    h: "7. Retention and security",
    p: [
      "Diagnostic and crash logs are retained for a limited period (typically 90 days or less) to investigate stability issues, after which they are automatically purged or aggregated. Alert preferences are saved locally on your device and are cleared immediately upon application uninstallation. All data transmitted between the app, our website, and cloud endpoints is encrypted using TLS/HTTPS protocols.",
    ],
  },
  {
    h: "8. Data Deletion Rights (Google Play Compliance)",
    p: [
      "Under Google Play User Data policies and global privacy regulations (including GDPR and CCPA), you have the right to request the permanent deletion of any data associated with your device. You can submit an account and data deletion request through our interactive portal at forexnews.app/delete-account or by emailing hello@forexnews.app with the subject line 'Account Deletion Request'. All requests are permanently fulfilled within 30 days.",
    ],
  },
  {
    h: "9. Children's Privacy",
    p: [
      "Forex News is strictly designed for adult financial market traders and analysts. The service is not targeted at or intended for children under 18 years of age, and we do not knowingly collect personal information from minors.",
    ],
  },
  {
    h: "10. International transfers",
    p: [
      "Our third-party cloud and monetization providers may process data in data centers located in the United States and other global jurisdictions. These providers employ standard contractual clauses and security certifications to safeguard cross-border data transfers.",
    ],
  },
  {
    h: "11. Changes to this policy",
    p: [
      "We may update this Privacy Policy from time to time to reflect changes in our app features, monetization partners, or legal requirements. When updates occur, the 'Last updated' date at the top of this document will be revised accordingly.",
    ],
  },
  {
    h: "12. Contact",
    p: [
      "For questions, privacy inquiries, or data protection requests, contact our developer operations team directly at hello@forexnews.app.",
    ],
  },
];

export function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal · Privacy"
      title="Privacy Policy"
      updated="23 November 2026"
      intro="Forex News is an economic calendar and trading calculator app for Android. This policy sets out our data practices, third-party infrastructure, and advertising monetization SDK disclosures in full compliance with Google Play Developer policies."
      description="How Forex News handles data: privacy practices and third-party advertising SDK disclosures (Google AdMob, Unity Ads, Unity LevelPlay, Meta Audience Network) for the Forex News Android app and website."
      canonicalPath="/privacy"
      sections={sections}
    />
  );
}
