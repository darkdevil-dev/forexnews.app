import { SectionHeading } from "@/components/site/SectionHeading";

const screenshots = [
  {
    src: "/screenshots/1.png",
    alt: "Forex News Economic Calendar View",
    title: "Global Calendar",
    subtitle: "Every release with impact rating",
  },
  {
    src: "/screenshots/2.png",
    alt: "Event Details and Forecast",
    title: "Forecast & History",
    subtitle: "Previous, consensus & actual",
  },
  {
    src: "/screenshots/3.png",
    alt: "Custom Event Alerts Setup",
    title: "Push Alerts",
    subtitle: "Minutes before the print",
  },
  {
    src: "/screenshots/4.png",
    alt: "Trading Calculators Menu",
    title: "16 Pro Calculators",
    subtitle: "Everything in one place",
  },
  {
    src: "/screenshots/5.png",
    alt: "Position Size and Risk Calculator",
    title: "Position Sizing",
    subtitle: "Accurate lot size & risk %",
  },
  {
    src: "/screenshots/6.png",
    alt: "Pip Value and Margin Calculator",
    title: "Pip & Margin",
    subtitle: "Live contract conversions",
  },
];

function ScreenshotCard({ item }) {
  return (
    <div className="group/item flex flex-col items-center shrink-0 w-[130px] sm:w-[150px] md:w-[170px] select-none">
      {/* Phone Mockup Frame - compact height */}
      <div className="relative w-full aspect-[9/19.5] rounded-[20px] sm:rounded-[26px] p-1.5 sm:p-2 bg-zinc-900 border-[2.5px] sm:border-[3px] border-zinc-800 dark:border-zinc-700/80 shadow-[0_10px_25px_-8px_rgba(0,0,0,0.3)] dark:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.7)] transition-transform duration-300 group-hover/item:scale-[1.02]">
        {/* Dynamic Island / Speaker Pill */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-2 sm:h-2.5 bg-zinc-950 rounded-full z-20 pointer-events-none" />

        {/* Screen Content */}
        <div className="relative w-full h-full overflow-hidden rounded-[14px] sm:rounded-[20px] bg-black">
          <img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* Caption */}
      <div className="mt-2.5 text-center">
        <p className="text-[11.5px] sm:text-[12.5px] font-semibold text-foreground tracking-tight">
          {item.title}
        </p>
        <p className="text-[10px] sm:text-[10.5px] text-muted-foreground mt-0.5 line-clamp-1">
          {item.subtitle}
        </p>
      </div>
    </div>
  );
}

function Half({ hidden }) {
  return (
    <div className="flex gap-4 sm:gap-5 pr-4 sm:pr-5" aria-hidden={hidden || undefined}>
      {screenshots.map((item, index) => (
        <ScreenshotCard key={`${item.title}-${index}`} item={item} />
      ))}
    </div>
  );
}

export function ScreenshotGallery() {
  return (
    <section className="border-b border-border bg-background py-10 sm:py-14 overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 text-center mb-6 sm:mb-8">
        <SectionHeading
          eyebrow="Live App Preview"
          title="Built for speed. Designed for focus."
          description="Every scheduled economic release, custom event notification, and essential trading calculator wrapped in a fast, calm Android experience."
          align="center"
        />
      </div>

      {/* Bounded container with visible side margins / padding on both sides */}
      <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
        <div
          className="marquee relative w-full overflow-hidden rounded-2xl [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
          aria-label="Forex News Android app screenshots carousel"
        >
          <div className="marquee-track flex w-max py-1.5">
            <Half />
            <Half hidden />
          </div>
        </div>
      </div>

      {/* Sub-label under gallery */}
      <p className="text-center font-mono text-[10px] text-muted-foreground/60 uppercase tracking-[0.2em] mt-5">
        Swipe or hover to pause · Available on Android
      </p>
    </section>
  );
}
