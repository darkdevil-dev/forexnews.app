import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Send,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Smartphone,
  Clock,
  HelpCircle,
} from "lucide-react";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { SiteFooter } from "@/components/site/SiteFooter";
import { usePageMeta } from "@/hooks/use-page-meta";
import { CONTACT_EMAIL, WEB3FORMS_ACCESS_KEY, PLAY_STORE_URL } from "@/lib/site";

export function ContactPage() {
  usePageMeta({
    title: "Contact Support & Inquiries | Forex News",
    description:
      "Get in touch with the Forex News team for technical support, economic calendar questions, calculator feature requests, and partnership inquiries.",
    canonicalPath: "/contact",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "General Question",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const emailSubject = formData.subject.trim()
        ? `[${formData.category}] ${formData.subject.trim()} - Forex News`
        : `[${formData.category}] Contact Form Message - Forex News`;

      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: emailSubject,
        from_name: "Forex News Contact Form",
        name: formData.name,
        email: formData.email,
        category: formData.category,
        message: formData.message,
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
        throw new Error(result.message || "Failed to deliver message. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err.message ||
          `Message delivery failed. You can reach out directly via email at ${CONTACT_EMAIL}.`
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
              <Mail className="h-3.5 w-3.5" />
              <span>Support &amp; Inquiries</span>
            </div>
            <h1 className="mt-4 text-[clamp(1.9rem,4vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.035em] text-foreground">
              Contact Forex News Support
            </h1>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
              Have questions regarding our macroeconomic event calendar, push notification alerts,
              or offline trading calculators? Fill out the form below or send us an email directly.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-foreground font-semibold text-[13.5px]">
                <Mail className="h-4 w-4 text-signal" />
                <span>Direct Email</span>
              </div>
              <p className="mt-2 text-[12.5px] text-muted-foreground">
                Drop us a line anytime for rapid support:
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-2 inline-block font-mono text-[13px] text-signal underline hover:text-signal/80"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-foreground font-semibold text-[13.5px]">
                <Clock className="h-4 w-4 text-signal" />
                <span>Response Time</span>
              </div>
              <p className="mt-2 text-[12.5px] text-muted-foreground">
                Support tickets and inquiries are typically answered within 24 to 48 business hours.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-foreground font-semibold text-[13.5px]">
                <Smartphone className="h-4 w-4 text-signal" />
                <span>Android App</span>
              </div>
              <p className="mt-2 text-[12.5px] text-muted-foreground">
                Download the latest release and rate us on Google Play:
              </p>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-[12.5px] font-semibold text-signal hover:underline"
              >
                <span>View on Play Store</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-8">
            {status === "success" ? (
              <div className="py-8 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-signal/10 border border-signal/30 text-signal">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h2 className="mt-4 text-[20px] font-bold text-foreground">
                  Message Sent Successfully
                </h2>
                <p className="mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed text-muted-foreground">
                  Thank you for reaching out to Forex News. Your message has been routed to our support
                  desk, and a team member will reply to <span className="text-foreground font-medium">{formData.email}</span> as soon as possible.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setFormData({
                        name: "",
                        email: "",
                        category: "General Question",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="rounded-lg border border-border bg-muted/60 px-4 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    Send Another Message
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
                    Send Us a Message
                  </h2>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    Please fill out the form below. All inquiries are treated with confidentiality.
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
                      htmlFor="contact-name"
                      className="block text-[12.5px] font-medium text-foreground mb-1.5"
                    >
                      Your Name <span className="text-signal">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Jordan Smith"
                      disabled={status === "loading"}
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-[13.5px] text-foreground placeholder:text-muted-foreground/60 focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[12.5px] font-medium text-foreground mb-1.5"
                    >
                      Email Address <span className="text-signal">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      disabled={status === "loading"}
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-[13.5px] text-foreground placeholder:text-muted-foreground/60 focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-category"
                      className="block text-[12.5px] font-medium text-foreground mb-1.5"
                    >
                      Topic / Category <span className="text-signal">*</span>
                    </label>
                    <select
                      id="contact-category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-[13.5px] text-foreground focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal disabled:opacity-50"
                    >
                      <option value="General Question">General Question</option>
                      <option value="Bug Report">App Bug or Issue</option>
                      <option value="Calendar Data">Economic Calendar Data Inquiry</option>
                      <option value="Calculator Feature">Calculator Feature Request</option>
                      <option value="Alerts & Notifications">Alert / Notification Issue</option>
                      <option value="Privacy & Data">Privacy &amp; Data Deletion Inquiry</option>
                      <option value="Partnership">Partnership or Directory Listing</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-[12.5px] font-medium text-foreground mb-1.5"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Brief summary of your inquiry..."
                      disabled={status === "loading"}
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-[13.5px] text-foreground placeholder:text-muted-foreground/60 focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[12.5px] font-medium text-foreground mb-1.5"
                  >
                    Your Message <span className="text-signal">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message, question, or feature proposal in detail..."
                    disabled={status === "loading"}
                    className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-[13.5px] text-foreground placeholder:text-muted-foreground/60 focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-signal px-6 py-3 text-[14px] font-bold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
