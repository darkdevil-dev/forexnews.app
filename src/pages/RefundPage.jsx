import { LegalPage } from "@/components/legal/LegalPage";
import { CONTACT_EMAIL } from "@/lib/site";

const sections = [
  {
    h: "1. Overview & General Policy",
    p: [
      "Forex News (\"we\", \"us\", or \"our\") provides digital software services, real-time economic calendar tracking, notification infrastructure, and financial analytical calculators accessible through our Android application and website (forexnews.app).",
      "Because our digital products, Pro features, and subscriptions provide immediate digital access upon purchase, ALL PURCHASES AND SUBSCRIPTION PAYMENTS ARE STRICTLY NON-REFUNDABLE AND FINAL, subject only to the single technical exception expressly defined in Section 2 below.",
      "By purchasing a subscription, digital upgrade, or in-app product, you expressly acknowledge and agree that your statutory right of withdrawal/cancellation for digital content is waived once digital provisioning commences, and you agree to be bound by the terms of this Refund Policy.",
    ],
  },
  {
    h: "2. The Sole Eligible Exception: Technical Non-Activation",
    p: [
      "A refund will be granted ONLY AND EXCLUSIVELY under the following condition:",
      "A user completes a valid payment transaction, their payment method is successfully debited, but due to a verified server-side technical defect, database failure, or billing integration error, the purchased Pro/Subscription features were NOT activated or accessible on the user's account.",
      "If our technical team verifies that the payment was received but the digital service failed to provision entirely due to our technical malfunction, and the issue cannot be resolved within 48 hours of notification, we will issue a full 100% refund of the affected transaction.",
    ],
  },
  {
    h: "3. Non-Refundable Circumstances (No Exceptions)",
    p: [
      "Except for the technical failure explicitly stated in Section 2, absolutely no refunds, partial refunds, credits, or prorated reimbursements will be issued under any circumstances, including but not limited to:",
      "• Change of mind: Deciding you no longer need, want, or enjoy the application after purchase.",
      "• Failure to cancel auto-renewal: Forgetting to turn off or cancel an auto-renewing subscription before the next recurring billing date.",
      "• App uninstallation: Uninstalling or deleting the application from your mobile device does not automatically cancel an active Google Play subscription.",
      "• Trading results: Any trading losses, missed market opportunities, or dissatisfaction with economic events, volatility, or third-party market data.",
      "• Misunderstood functionality: Expecting investment recommendations, automated trading, trading signals, or broker integration (Forex News is strictly an informational and calculation tool).",
      "• Device incompatibility: Attempting to use the application on unsupported, jailbroken, rooted, or outdated Android operating systems.",
      "• Partial or unused periods: Unused days, weeks, or months remaining on a monthly, quarterly, annual, or multi-year subscription plan.",
    ],
  },
  {
    h: "4. Subscription Cancellation Policy",
    p: [
      "You have the right to cancel your subscription auto-renewal at any time:",
      "For subscriptions purchased via Google Play Store, you must manage and cancel your subscription directly through the Google Play app: Google Play Store > Profile Icon > Payments & Subscriptions > Subscriptions > Forex News > Cancel Subscription.",
      "When you cancel an auto-renewing subscription, auto-renewal will be turned off immediately. You will retain full access to all purchased Pro features until the end of your current paid billing period. No prorated or partial refund will be provided for the remaining days of the current billing cycle.",
    ],
  },
  {
    h: "5. How to Submit a Technical Refund Claim",
    p: [
      "If you believe your transaction qualifies for a refund under the technical non-activation exception described in Section 2, you must submit a formal refund request within 7 calendar days of the transaction timestamp.",
      `Email your claim to: ${CONTACT_EMAIL} with the subject line: \"Refund Claim: Technical Non-Activation - [Your Order ID]\".`,
      "Your request MUST include all of the following information:",
      "1. Full Name and registered account email address.",
      "2. Official Google Play Order Number (formatted as GPA.XXXX-XXXX-XXXX-XXXXX) or payment processor receipt.",
      "3. Exact transaction date, time, and currency amount.",
      "4. A clear description of the technical issue, accompanied by screenshots showing payment confirmation and the corresponding locked/unactivated state inside the application.",
      "Claims submitted without valid transaction proof or submitted outside the 7-day window will not be eligible for review.",
    ],
  },
  {
    h: "6. Investigation and Refund Processing",
    p: [
      "Upon receiving your claim, our engineering team will inspect transaction logs, Google Play Real-Time Developer Notifications (RTDN), and account entitlement records.",
      "We will respond to your request within two (2) business days.",
      "If a genuine technical failure is confirmed, our support team may first offer to immediately activate and provision your subscription manually, along with appropriate complimentary extension time for the inconvenience.",
      "If manual provisioning is impossible or if you decline activation due to the technical failure, an authorized refund will be processed immediately. Refunds are returned strictly to the original payment method used. Depending on your financial institution or card issuer, funds typically reflect in your account within 5 to 10 business days.",
    ],
  },
  {
    h: "7. Google Play Purchases",
    p: [
      "Because the Forex News Android application is distributed through the Google Play Store, in-app purchases are subject to Google's standard developer billing frameworks. Users may also request refunds directly from Google Play within 48 hours of purchase by visiting play.google.com and checking their Order History, subject to Google Play's refund guidelines.",
    ],
  },
  {
    h: "8. Chargebacks and Fraud Prevention",
    p: [
      "We urge users to contact our support team directly to resolve any technical billing errors. Initiating an unjustified chargeback, payment dispute, or fraudulent payment reversal without first contacting our support team constitutes a breach of our Terms of Service.",
      "We reserve the right to immediately suspend or permanently terminate user accounts, revoke digital licences, and dispute false chargebacks with supporting server logs and proof of digital delivery.",
    ],
  },
  {
    h: "9. Contact Us",
    p: [
      "For any billing questions, subscription inquiries, or technical support requests regarding this Refund Policy, please contact our support desk:",
      `Email: ${CONTACT_EMAIL}`,
      "Website: https://forexnews.app",
    ],
  },
];

export function RefundPage() {
  return (
    <LegalPage
      eyebrow="Legal · Policy"
      title="Refund Policy"
      updated="10 November 2026"
      intro="Our comprehensive refund policy for Forex News. All purchases are final, with exceptions strictly limited to verified technical billing non-activation."
      description="Official Refund Policy for the Forex News Android app and forexnews.app website."
      canonicalPath="/refund-policy"
      sections={sections}
    />
  );
}
