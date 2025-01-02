import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import { useAuth } from "./components/AuthProvider";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import AddressManagement from "./pages/AddressManagement";
import PaymentMethods from "./pages/PaymentMethods";
import Settings from "./pages/Settings";
import OrderManagement from "./pages/OrderManagement";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

// 보호된 라우트 컴포넌트
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!session) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { session } = useAuth();

  return (
    <Routes>
      <Route path="/auth" element={session ? <Navigate to="/" /> : <Auth />} />
      <Route path="/" element={<Index />} />
      <Route path="/category/:id" element={<Index />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <ProfileEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/address"
        element={
          <ProtectedRoute>
            <AddressManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/payment"
        element={
          <ProtectedRoute>
            <PaymentMethods />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/orders"
        element={
          <ProtectedRoute>
            <OrderManagement />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;