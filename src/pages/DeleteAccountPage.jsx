import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  Smartphone,
  Lock,
  Info,
} from "lucide-react";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { SiteFooter } from "@/components/site/SiteFooter";
import { usePageMeta } from "@/hooks/use-page-meta";
import { CONTACT_EMAIL, WEB3FORMS_ACCESS_KEY, PLAY_STORE_URL } from "@/lib/site";

export function DeleteAccountPage() {
  usePageMeta({
    title: "Delete Account & Data Request | Forex News",
    description:
      "Request deletion of your account, push notification tokens, and associated data for the Forex News Android app under Google Play policy.",
    canonicalPath: "/delete-account",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    device_model: "",
    deletion_scope: "full",
    reason: "",
    confirm: false,
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.confirm) {
      setErrorMessage("Please check the confirmation box to authorize data deletion.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "Google Play Account & Data Deletion Request - Forex News (com.forexnews.app)",
        from_name: "Forex News Account Deletion Portal",
        name: formData.name,
        email: formData.email,
        device_model: formData.device_model || "Not specified",
        deletion_scope:
          formData.deletion_scope === "full"
            ? "Full Deletion: All push tokens, notification preferences, and support correspondence"
            : formData.deletion_scope === "push_only"
            ? "Push Notifications Only: Invalidate FCM token and alert preferences"
            : "Support & Communications Only: Purge email correspondence and feedback tickets",
        reason: formData.reason || "No specific reason provided",
        app_package: "com.forexnews.app",
        source_url: window.location.href,
        botcheck: "",
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
      } else {
        throw new Error(result.message || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err.message ||
          `Submission failed. You can also send your deletion request directly to ${CONTACT_EMAIL}.`
      );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <div>
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-5">
            <Link to="/" className="flex items-center gap-1.5 focus:outline-none">
              <span className="text-[19px] font-extrabold tracking-[-0.03em]">
                <span className="text-signal">F</span>
                <span className="text-foreground">orex News</span>
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to App</span>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-signal/20 bg-signal/10 px-3 py-1 text-[11px] font-semibold text-signal">
              <Trash2 className="h-3.5 w-3.5" />
              <span>Google Play Data Deletion</span>
            </div>
            <h1 className="mt-4 text-[clamp(1.9rem,4vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.035em] text-foreground">
              Request Account &amp; User Data Deletion
            </h1>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
              Pursuant to Google Play User Data policies, users of the{" "}
              <strong className="text-foreground font-semibold">Forex News</strong> Android app (package:{" "}
              <code className="font-mono text-signal text-[13px] bg-muted px-1.5 py-0.5 rounded">
                com.forexnews.app
              </code>
              ) can request the permanent deletion of their account records, notification tokens, and
              associated support data.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-foreground font-semibold text-[14px]">
                <ShieldCheck className="h-4 w-4 text-signal" />
                <span>Data Eligible for Deletion</span>
              </div>
              <ul className="mt-3 space-y-2 text-[13px] text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal" />
                  <span>Push notification tokens (Firebase Cloud Messaging)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal" />
                  <span>User custom event alert preferences and subscription filters</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal" />
                  <span>Support tickets, feedback correspondence, and associated emails</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal" />
                  <span>Crash telemetry identifiers linked to your device installation</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-foreground font-semibold text-[14px]">
                <Info className="h-4 w-4 text-signal" />
                <span>Deletion Timeline &amp; Retention</span>
              </div>
              <ul className="mt-3 space-y-2 text-[13px] text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal" />
                  <span>
                    <strong className="text-foreground">Processing window:</strong> Verified requests
                    are completed within 30 calendar days.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal" />
                  <span>
                    <strong className="text-foreground">Immediate revocation:</strong> Uninstalling
                    the app immediately invalidates your push token from event dispatches.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal" />
                  <span>
                    <strong className="text-foreground">No financial data stored:</strong> Forex News
                    does not store trading accounts, broker passwords, or payment cards.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-8">
            {status === "success" ? (
              <div className="py-6 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-signal/10 border border-signal/30 text-signal">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h2 className="mt-4 text-[20px] font-bold text-foreground">
                  Deletion Request Submitted Successfully
                </h2>
                <p className="mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed text-muted-foreground">
                  Your deletion request has been logged. Our privacy operations team will permanently
                  purge any associated push tokens, alert preferences, and support correspondence within
                  30 days.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setFormData({
                        name: "",
                        email: "",
                        device_model: "",
                        deletion_scope: "full",
                        reason: "",
                        confirm: false,
                      });
                    }}
                    className="rounded-lg border border-border bg-muted/60 px-4 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    Submit Another Request
                  </button>
                  <Link
                    to="/"
                    className="rounded-lg bg-signal px-4 py-2 text-[13px] font-semibold text-background transition-opacity hover:opacity-90"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-[18px] font-bold text-foreground">
                    Submit Data Deletion Form
                  </h2>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    Please provide the details below so we can accurately identify and purge your records.
                  </p>
                </div>

                {status === "error" && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-[13px] text-red-400">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[12.5px] font-medium text-foreground mb-1.5"
                    >
                      Your Name <span className="text-signal">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      disabled={status === "loading"}
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-[13.5px] text-foreground placeholder:text-muted-foreground/60 focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[12.5px] font-medium text-foreground mb-1.5"
                    >
                      Email Address <span className="text-signal">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      disabled={status === "loading"}
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-[13.5px] text-foreground placeholder:text-muted-foreground/60 focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal disabled:opacity-50"
                    />
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Used to match support history and send deletion confirmation.
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="device_model"
                    className="block text-[12.5px] font-medium text-foreground mb-1.5"
                  >
                    Android Device Model or FCM Token (Optional)
                  </label>
                  <input
                    type="text"
                    id="device_model"
                    name="device_model"
                    value={formData.device_model}
                    onChange={handleChange}
                    placeholder="e.g. Samsung Galaxy S23, Pixel 8, or app notification ID"
                    disabled={status === "loading"}
                    className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-[13.5px] text-foreground placeholder:text-muted-foreground/60 focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal disabled:opacity-50"
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Helps pinpoint your anonymous Firebase Cloud Messaging notification token.
                  </p>
                </div>

                <div>
                  <label className="block text-[12.5px] font-medium text-foreground mb-2">
                    Scope of Data Deletion <span className="text-signal">*</span>
                  </label>
                  <div className="space-y-2.5">
                    <label className="flex items-start gap-3 rounded-lg border border-border/80 bg-background/50 p-3 cursor-pointer hover:border-signal/40 transition-colors">
                      <input
                        type="radio"
                        name="deletion_scope"
                        value="full"
                        checked={formData.deletion_scope === "full"}
                        onChange={handleChange}
                        className="mt-0.5 text-signal focus:ring-signal"
                      />
                      <div className="text-[13px]">
                        <span className="font-semibold text-foreground">
                          Complete Deletion (Recommended)
                        </span>
                        <p className="text-muted-foreground text-[12px] mt-0.5">
                          Purge all push notification registration tokens, alert preferences, and email
                          support correspondence.
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 rounded-lg border border-border/80 bg-background/50 p-3 cursor-pointer hover:border-signal/40 transition-colors">
                      <input
                        type="radio"
                        name="deletion_scope"
                        value="push_only"
                        checked={formData.deletion_scope === "push_only"}
                        onChange={handleChange}
                        className="mt-0.5 text-signal focus:ring-signal"
                      />
                      <div className="text-[13px]">
                        <span className="font-semibold text-foreground">
                          Push Notification Tokens Only
                        </span>
                        <p className="text-muted-foreground text-[12px] mt-0.5">
                          Unsubscribe your device and purge cloud notification dispatch tokens.
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 rounded-lg border border-border/80 bg-background/50 p-3 cursor-pointer hover:border-signal/40 transition-colors">
                      <input
                        type="radio"
                        name="deletion_scope"
                        value="support_only"
                        checked={formData.deletion_scope === "support_only"}
                        onChange={handleChange}
                        className="mt-0.5 text-signal focus:ring-signal"
                      />
                      <div className="text-[13px]">
                        <span className="font-semibold text-foreground">
                          Support &amp; Feedback History Only
                        </span>
                        <p className="text-muted-foreground text-[12px] mt-0.5">
                          Delete previous contact form submissions, bug reports, and email threads.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="reason"
                    className="block text-[12.5px] font-medium text-foreground mb-1.5"
                  >
                    Reason / Additional Instructions (Optional)
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    rows={3}
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Provide any additional details or feedback (optional)..."
                    disabled={status === "loading"}
                    className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-[13.5px] text-foreground placeholder:text-muted-foreground/60 focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal disabled:opacity-50"
                  />
                </div>

                <div className="rounded-xl border border-border/80 bg-background/60 p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="confirm"
                      checked={formData.confirm}
                      onChange={handleChange}
                      required
                      className="mt-1 h-4 w-4 rounded border-border text-signal focus:ring-signal"
                    />
                    <span className="text-[12.5px] leading-relaxed text-muted-foreground">
                      I confirm that I am requesting the permanent deletion of my associated user data
                      and push notification subscriptions for{" "}
                      <strong className="text-foreground font-semibold">Forex News</strong> under Google
                      Play data deletion terms.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-signal px-5 py-3 text-[14px] font-bold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Submitting Deletion Request...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      <span>Submit Deletion Request</span>
                    </>
                  )}
                </button>

                <p className="font-mono text-[11px] text-muted-foreground">
                  Alternative request channel: Email our privacy team directly at{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=Account%20Deletion%20Request%20-%20Forex%20News`}
                    className="text-signal underline hover:text-signal/80"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
