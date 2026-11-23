import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { MotionGallery } from "@/components/site/MotionGallery";
import { ScreenshotGallery } from "@/components/site/ScreenshotGallery";
import { StepsSection } from "@/components/site/StepsSection";
import { AlertsSection } from "@/components/site/AlertsSection";
import { TrustSection } from "@/components/site/TrustSection";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { ToolsSection } from "@/components/site/ToolsSection";
import { BlogSection } from "@/components/site/BlogSection";
import { FaqSection } from "@/components/site/FaqSection";
import { FinalCta } from "@/components/site/FinalCta";
import { SiteFooter } from "@/components/site/SiteFooter";
import { usePageMeta } from "@/hooks/use-page-meta";

export function HomePage() {
  usePageMeta({
    title: "Forex News App | Economic Calendar, Alerts & 16 Calculators",
    description:
      "Forex News is an Android app with a live economic calendar, fast pre-release event alerts, and 16 trading calculators. Free, no ads, no signup.",
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
        <BlogSection />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
