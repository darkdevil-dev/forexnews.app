import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { MotionGallery } from "@/components/site/MotionGallery";
import { ScreenshotGallery } from "@/components/site/ScreenshotGallery";
import { StepsSection } from "@/components/site/StepsSection";
import { AlertsSection } from "@/components/site/AlertsSection";
import { TrustSection } from "@/components/site/TrustSection";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { ToolsSection } from "@/components/site/ToolsSection";
import { FaqSection } from "@/components/site/FaqSection";
import { FinalCta } from "@/components/site/FinalCta";
import { SiteFooter } from "@/components/site/SiteFooter";
import { usePageMeta } from "@/hooks/use-page-meta";

export function HomePage() {
  usePageMeta({
    title: "Forex News | Economic Calendar, Alerts & Trading Calculators",
    description:
      "Forex News is an Android app with the full global economic calendar, custom alerts before every release, and all the trading calculators you need. Download it on Google Play.",
    canonicalPath: "/",
  });

  return (
    <div id="top" className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <MotionGallery />
        <ScreenshotGallery />
        <StepsSection />
        <AlertsSection />
        <TrustSection />
        <FeatureGrid />
        <ToolsSection />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
