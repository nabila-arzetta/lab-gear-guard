import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { DashboardAdmin } from "./pages/DashboardAdmin";
import { DashboardUser } from "./pages/DashboardUser";
import { Login } from "./pages/Login";
import { MasterBarang } from "./pages/MasterBarang";
import MasterKategori from "./pages/MasterKategori";
import MasterUsers from "./pages/MasterUsers";
import MasterLab from "./pages/MasterLab";
import { PermintaanBarang } from "./pages/PermintaanBarang";
import { TransferBarang } from "./pages/TransferBarang";
import { DataInventaris } from "./pages/DataInventaris";
import { StatusPermintaan } from "./pages/StatusPermintaan";
import { Laporan } from "./pages/Laporan";
import { KartuStok } from "./pages/KartuStok";
import { StokOpname } from "./pages/StokOpname";
import { PengembalianBarang } from "./pages/PengembalianBarang";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

// Dashboard Route - redirects based on role
const DashboardRoute = () => {
  const { user, isAdmin } = useAuth();
  
  if (!user) return <Navigate to="/login" />;
  
  return (
    <DashboardLayout>
      {isAdmin() ? <DashboardAdmin /> : <DashboardUser />}
    </DashboardLayout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashboardRoute />} />
            <Route 
              path="/master/barang" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <MasterBarang />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/master/kategori" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <MasterKategori />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/master/users" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <MasterUsers />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/master/lab" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <MasterLab />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/laporan" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Laporan />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/permintaan" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PermintaanBarang />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/transfer" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <TransferBarang />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/inventaris" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <DataInventaris />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/status-permintaan" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <StatusPermintaan />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/kartu-stok/:barangId" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <KartuStok />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/stok-opname" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <StokOpname />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/pengembalian" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PengembalianBarang />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
