import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PillarPage from "./pages/PillarPage";
import ServicePage from "./pages/ServicePage";
import DedicatedServers from "./pages/DedicatedServers";
import VPS from "./pages/VPS";
import ApplicationHosting from "./pages/ApplicationHosting";
import DatabaseHosting from "./pages/DatabaseHosting";
import StorageProvisioning from "./pages/StorageProvisioning";
import BackupAndDR from "./pages/BackupAndDR";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/portal/Dashboard";
import Quotes from "./pages/portal/Quotes";
import Tickets from "./pages/portal/Tickets";
import Profile from "./pages/portal/Profile";
import Admin from "./pages/portal/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/data-center-services" element={<PillarPage />} />
          <Route path="/data-center-services/dedicated-servers" element={<DedicatedServers />} />
          <Route path="/data-center-services/vps" element={<VPS />} />
          <Route path="/data-center-services/application-hosting" element={<ApplicationHosting />} />
          <Route path="/data-center-services/database-hosting" element={<DatabaseHosting />} />
          <Route path="/data-center-services/storage-provisioning" element={<StorageProvisioning />} />
          <Route path="/data-center-services/backup-and-dr" element={<BackupAndDR />} />
          <Route path="/hosting-services" element={<PillarPage />} />
          <Route path="/it-infrastructure" element={<PillarPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/portal" element={<Dashboard />} />
          <Route path="/portal/quotes" element={<Quotes />} />
          <Route path="/portal/tickets" element={<Tickets />} />
          <Route path="/portal/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          {/* Generic service pages: /:pillar/:service — must stay after the
              hand-built pages above so those keep their own components. */}
          <Route path="/:pillarSlug/:serviceSlug" element={<ServicePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
