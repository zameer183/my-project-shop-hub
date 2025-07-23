import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { GlobalProvider } from "@/contexts/GlobalContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { UserProvider } from "@/contexts/UserContext";
import Index from "./pages/Index";
import Category from "./pages/Category";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import Shopping from "./pages/Shopping";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import FunctionTest from "./pages/FunctionTest";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GlobalProvider>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/shopping" element={<Shopping />} />
                  <Route
                    path="/category/:categoryId"
                    element={<ProductListing />}
                  />
                  <Route path="/search" element={<ProductListing />} />
                  <Route
                    path="/product/:productId"
                    element={<ProductDetail />}
                  />
                  <Route path="/cart" element={<Cart />} />
                  <Route
                    path="/checkout"
                    element={<div>Checkout Page - Coming Soon</div>}
                  />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route
                    path="/orders"
                    element={<div>Orders Page - Coming Soon</div>}
                  />
                  <Route
                    path="/profile"
                    element={<div>Profile Page - Coming Soon</div>}
                  />
                  <Route path="/deals" element={<ProductListing />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/register"
                    element={<div>Register Page - Coming Soon</div>}
                  />

                  {/* Seller Routes */}
                  <Route
                    path="/seller/register"
                    element={<div>Seller Registration - Coming Soon</div>}
                  />
                  <Route
                    path="/seller/dashboard"
                    element={<div>Seller Dashboard - Coming Soon</div>}
                  />
                  <Route
                    path="/seller/products"
                    element={<div>Seller Products - Coming Soon</div>}
                  />
                  <Route
                    path="/seller/orders"
                    element={<div>Seller Orders - Coming Soon</div>}
                  />
                  <Route
                    path="/seller/analytics"
                    element={<div>Seller Analytics - Coming Soon</div>}
                  />

                  {/* Admin Routes */}
                  <Route
                    path="/admin/dashboard"
                    element={<div>Admin Dashboard - Coming Soon</div>}
                  />
                  <Route
                    path="/admin/users"
                    element={<div>Admin Users - Coming Soon</div>}
                  />
                  <Route
                    path="/admin/products"
                    element={<div>Admin Products - Coming Soon</div>}
                  />
                  <Route
                    path="/admin/reports"
                    element={<div>Admin Reports - Coming Soon</div>}
                  />

                  {/* Info Pages */}
                  <Route
                    path="/about"
                    element={<div>About Page - Coming Soon</div>}
                  />
                  <Route
                    path="/contact"
                    element={<div>Contact Page - Coming Soon</div>}
                  />
                  <Route
                    path="/help"
                    element={<div>Help Center - Coming Soon</div>}
                  />
                  <Route
                    path="/returns"
                    element={<div>Returns Page - Coming Soon</div>}
                  />
                  <Route
                    path="/shipping"
                    element={<div>Shipping Info - Coming Soon</div>}
                  />
                  <Route
                    path="/track"
                    element={<div>Track Order - Coming Soon</div>}
                  />
                  <Route
                    path="/privacy"
                    element={<div>Privacy Policy - Coming Soon</div>}
                  />
                  <Route
                    path="/terms"
                    element={<div>Terms of Service - Coming Soon</div>}
                  />

                  {/* Function Test Route */}
                  <Route path="/test" element={<FunctionTest />} />

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </GlobalProvider>
  </QueryClientProvider>
);

export default App;
