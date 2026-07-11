import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";

import Index from "./pages/Index";
import AssessPage from "./pages/AssessPage";
import MillmanPage from "./pages/MillmanPage";
import JungPage from "./pages/JungPage";
import EnneagramPage from "./pages/EnneagramPage";
import HumanDesignPage from "./pages/HumanDesignPage";
import WirePage from "./pages/WirePage";
import ExplorePage from "./pages/ExplorePage";
import { NIP19Page } from "./pages/NIP19Page";
import NotFound from "./pages/NotFound";

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/assess" element={<AssessPage />} />
        <Route path="/assess/millman" element={<MillmanPage />} />
        <Route path="/assess/jung" element={<JungPage />} />
        <Route path="/assess/enneagram" element={<EnneagramPage />} />
        <Route path="/assess/human-design" element={<HumanDesignPage />} />
        <Route path="/wire" element={<WirePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        {/* NIP-19 route for npub1, note1, naddr1, nevent1, nprofile1 */}
        <Route path="/:nip19" element={<NIP19Page />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
