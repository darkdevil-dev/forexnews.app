import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/site";
import { SectionHeading } from "@/components/site/SectionHeading";

const faqs = [
  {
    q: "What is Forex News?",
    a: "An Android app that keeps the global economic calendar, event alerts and trading calculators in one place, so you can plan around the releases that actually move the market.",
  },
  {
    q: "Which economic events does it cover?",
    a: "The full calendar across the major economies - interest rate decisions, employment and inflation data, GDP, PMIs, central bank statements and more - with impact levels, forecast, previous and actual values.",
  },
  {
    q: "How do event alerts work?",
    a: "Choose the events, currencies or impact levels you care about, then pick a lead time of 5, 15, 30 or 60 minutes. A push notification arrives before the release, so you are ready when volatility does.",
  },
  {
    q: "Which calculators are included?",
    a: "Position size, pip value, point value, required margin, leverage, profit and loss, risk to reward, break-even, swap estimates and a currency converter - sixteen tools in total.",
  },
  {
    q: "Do I need an account to use the app?",
    a: "No. The calendar opens straight away. You are asked for notification permission only if you choose to set alerts.",
  },
  {
    q: "Does Forex News give trading signals or advice?",
    a: "No. It is an information tool. It shows data and does the arithmetic - it never tells you what to buy or sell, and nothing in it is financial advice.",
  },
];

function Item({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="text-[14px] font-semibold tracking-[-0.015em] text-foreground sm:text-[15px]">
          {item.q}
        </span>
        <span
          className={`grid h-6 w-6 shrink-0 place-items-center rounded-[6px] border transition-all duration-200 ${
            isOpen
              ? "rotate-45 border-signal bg-signal text-black"
              : "border-border text-muted-foreground"
          }`}
        >
          <Plus className="h-3 w-3" strokeWidth={2.4} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-5 pr-10 text-[13px] leading-relaxed text-muted-foreground">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeading eyebrow="06 - Questions" title="The short answers." />
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-6 inline-flex font-mono text-[11.5px] text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-signal"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          <div>
            {faqs.map((item, i) => (
              <Item
                key={item.q}
                item={item}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}