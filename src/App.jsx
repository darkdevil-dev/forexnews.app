import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { HomePage } from "./pages/HomePage.jsx";
import { PrivacyPage } from "./pages/PrivacyPage.jsx";
import { TermsPage } from "./pages/TermsPage.jsx";
import { RiskPage } from "./pages/RiskPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/risk-disclaimer" element={<RiskPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Analytics />
    </>
  );
}
