
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Photos from "./pages/Photos";
import Info from "./pages/Info";
import NotFound from "./pages/NotFound";

// Create a new QueryClient instance for React Query
const queryClient = new QueryClient();

/**
 * Main App component that sets up:
 * - React Query for data fetching
 * - TooltipProvider for tooltips
 * - Toast notifications
 * - Routing with react-router-dom
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Toast notification systems */}
      <Toaster />
      <Sonner />
      
      {/* Router setup with all application routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/info" element={<Info />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
