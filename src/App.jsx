import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { HomePage } from "./pages/HomePage.jsx";
import { BlogListPage } from "./pages/BlogListPage.jsx";
import { BlogPostPage } from "./pages/BlogPostPage.jsx";
import { PrivacyPage } from "./pages/PrivacyPage.jsx";
import { TermsPage } from "./pages/TermsPage.jsx";
import { RiskPage } from "./pages/RiskPage.jsx";
import { RefundPage } from "./pages/RefundPage.jsx";
import { ContactPage } from "./pages/ContactPage.jsx";
import { DeleteAccountPage } from "./pages/DeleteAccountPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/risk-disclaimer" element={<RiskPage />} />
        <Route path="/refund-policy" element={<RefundPage />} />
        <Route path="/refund" element={<RefundPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/delete-account" element={<DeleteAccountPage />} />
        <Route path="/delete-data" element={<DeleteAccountPage />} />
        <Route path="/account-deletion" element={<DeleteAccountPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Analytics />
    </>
  );
}
