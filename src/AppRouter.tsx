import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { ReferralCapture } from "./components/ReferralCapture";

import Index from "./pages/Index";
import HowItWorksPage from "./pages/HowItWorksPage";
import AssessPage from "./pages/AssessPage";
import MillmanPage from "./pages/MillmanPage";
import JungPage from "./pages/JungPage";
import EnneagramPage from "./pages/EnneagramPage";
import HumanDesignPage from "./pages/HumanDesignPage";
import SoulgraphPage from "./pages/SoulgraphPage";
import ExplorePage from "./pages/ExplorePage";
import CouncilPage from "./pages/CouncilPage";
import OraclePage from "./pages/OraclePage";
import SupportPage from "./pages/SupportPage";
import SettingsPage from "./pages/SettingsPage";
import { NIP19Page } from "./pages/NIP19Page";
import NotFound from "./pages/NotFound";

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ReferralCapture />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/assess" element={<AssessPage />} />
        <Route path="/assess/millman" element={<MillmanPage />} />
        <Route path="/assess/jung" element={<JungPage />} />
        <Route path="/assess/enneagram" element={<EnneagramPage />} />
        <Route path="/assess/human-design" element={<HumanDesignPage />} />
        <Route path="/soulgraph" element={<SoulgraphPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/council" element={<CouncilPage />} />
        <Route path="/oracle" element={<OraclePage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* NIP-19 route for npub1, note1, naddr1, nevent1, nprofile1 */}
        <Route path="/:nip19" element={<NIP19Page />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
