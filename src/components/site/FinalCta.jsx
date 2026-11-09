import { DownloadButton } from "@/components/site/DownloadButton";
import { CONTACT_EMAIL } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="stripes bg-signal">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-black/55">
              Forex News · Android
            </p>
            <h2 className="mt-4 text-[clamp(1.9rem,4.4vw,3.2rem)] font-bold leading-[1.02] tracking-[-0.05em] text-black">
              Be at the screen before the number lands.
            </h2>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-black/65">
              Install Forex News from Google Play and keep the calendar, the alerts and the maths in
              one pocket.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto">
            <DownloadButton size="lg" variant="contrast" className="w-full sm:w-auto">
              Get it on Google Play
            </DownloadButton>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex h-12 w-full items-center justify-center rounded-[9px] border border-black/40 px-6 text-[13.5px] font-semibold text-black transition-colors hover:bg-black hover:text-white sm:w-auto"
            >
              Ask us anything
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}