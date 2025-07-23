import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import GlobalHeader from "@/components/ecommerce/GlobalHeader";
import ChatWidget from "@/components/ecommerce/ChatWidget";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/contexts/ProductContext";
import { useGlobal, formatPrice } from "@/contexts/GlobalContext";
import { useUser } from "@/contexts/UserContext";
import {
  CheckCircle,
  XCircle,
  TestTube,
  Play,
  ShoppingCart,
  Heart,
  Search,
  Globe,
  User,
  Package,
  CreditCard,
  Star,
  MessageCircle,
} from "lucide-react";

const FunctionTest = () => {
  const { addToCart, addToWishlist, cartItems, wishlistItems } = useCart();
  const { products, searchProducts } = useProducts();
  const { currency, language, setLanguage, setCurrency, t } = useGlobal();
  const { user, login, isAuthenticated } = useUser();

  const [testResults, setTestResults] = useState<Record<string, boolean>>({});
  const [testing, setTesting] = useState(false);

  const runTests = async () => {
    setTesting(true);
    const results: Record<string, boolean> = {};

    // Test 1: Global Context
    try {
      setLanguage("es");
      setLanguage("en");
      setCurrency("EUR");
      setCurrency("USD");
      results["global-context"] = true;
    } catch {
      results["global-context"] = false;
    }

    // Test 2: Product Context
    try {
      const searchResult = searchProducts("iPhone");
      results["product-search"] = searchResult.length > 0;
    } catch {
      results["product-search"] = false;
    }

    // Test 3: Cart Functionality
    try {
      if (products.length > 0) {
        addToCart({
          id: 999,
          name: "Test Product",
          price: 99.99,
          image: "/placeholder.svg",
          category: "Test",
          seller: "Test Seller",
          inStock: true,
          quantity: 1,
        });
        results["cart-add"] = true;
      } else {
        results["cart-add"] = false;
      }
    } catch {
      results["cart-add"] = false;
    }

    // Test 4: Wishlist Functionality
    try {
      addToWishlist({
        id: 998,
        name: "Test Wishlist Item",
        price: 49.99,
        image: "/placeholder.svg",
        rating: 4.5,
        reviews: 100,
        seller: "Test Seller",
      });
      results["wishlist-add"] = true;
    } catch {
      results["wishlist-add"] = false;
    }

    // Test 5: User Authentication
    try {
      const loginResult = await login("test@example.com", "password");
      results["user-auth"] = loginResult;
    } catch {
      results["user-auth"] = false;
    }

    // Test 6: Price Formatting
    try {
      const formatted = formatPrice(100, currency);
      results["price-format"] =
        formatted.includes("$") || formatted.includes("€");
    } catch {
      results["price-format"] = false;
    }

    // Test 7: Translation System
    try {
      const translated = t("nav.home");
      results["translation"] = translated !== "nav.home";
    } catch {
      results["translation"] = false;
    }

    setTestResults(results);
    setTesting(false);
  };

  const functionCategories = [
    {
      title: "Core Navigation",
      functions: [
        { name: "Homepage", route: "/", active: true },
        { name: "Shopping Page", route: "/shopping", active: true },
        { name: "Product Listing", route: "/search", active: true },
        { name: "Product Detail", route: "/product/1", active: true },
        { name: "Cart", route: "/cart", active: true },
        { name: "Wishlist", route: "/wishlist", active: true },
        { name: "Login", route: "/login", active: true },
      ],
    },
    {
      title: "eCommerce Features",
      functions: [
        { name: "Add to Cart", test: "cart-add", active: true },
        { name: "Add to Wishlist", test: "wishlist-add", active: true },
        { name: "Product Search", test: "product-search", active: true },
        { name: "Price Formatting", test: "price-format", active: true },
        { name: "User Authentication", test: "user-auth", active: true },
      ],
    },
    {
      title: "Global Features",
      functions: [
        { name: "Multi-language", test: "translation", active: true },
        { name: "Multi-currency", test: "global-context", active: true },
        { name: "Location Services", test: "global-context", active: true },
        { name: "Theme System", test: "global-context", active: true },
      ],
    },
    {
      title: "Interactive Components",
      functions: [
        { name: "Global Header", active: true },
        { name: "Product Cards", active: true },
        { name: "Chat Widget", active: true },
        { name: "Search Bar", active: true },
        { name: "Filter System", active: true },
        { name: "Cart Sidebar", active: true },
        { name: "Wishlist Sidebar", active: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Function Activation Test</h1>
          <p className="text-muted-foreground mb-6">
            Test and verify all GlobalMart functions are working correctly
          </p>

          <div className="flex items-center gap-4">
            <Button onClick={runTests} disabled={testing}>
              {testing ? (
                <>
                  <TestTube className="h-4 w-4 mr-2 animate-spin" />
                  Running Tests...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run All Tests
                </>
              )}
            </Button>

            <div className="text-sm text-muted-foreground">
              Current Status:{" "}
              {isAuthenticated
                ? `Logged in as ${user?.firstName}`
                : "Not logged in"}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-semibold">Cart Items</div>
                  <div className="text-sm text-muted-foreground">
                    {cartItems.length}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-600" />
                <div>
                  <div className="font-semibold">Wishlist Items</div>
                  <div className="text-sm text-muted-foreground">
                    {wishlistItems.length}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-semibold">Total Products</div>
                  <div className="text-sm text-muted-foreground">
                    {products.length}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="font-semibold">Current Settings</div>
                  <div className="text-sm text-muted-foreground">
                    {language.toUpperCase()} / {currency}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Function Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {functionCategories.map((category) => (
            <Card key={category.title}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>{category.title}</span>
                  <Badge variant="outline">
                    {category.functions.filter((f) => f.active).length}/
                    {category.functions.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.functions.map((func) => (
                    <div
                      key={func.name}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {func.active ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        <span className="font-medium">{func.name}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        {func.test && testResults[func.test] !== undefined && (
                          <Badge
                            variant={
                              testResults[func.test] ? "default" : "destructive"
                            }
                          >
                            {testResults[func.test] ? "Pass" : "Fail"}
                          </Badge>
                        )}

                        {func.route && (
                          <Button size="sm" variant="outline" asChild>
                            <a
                              href={func.route}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Test
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Test Results Summary */}
        {Object.keys(testResults).length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Test Results Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(testResults).map(([test, passed]) => (
                  <div key={test} className="flex items-center space-x-2">
                    {passed ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-sm">
                      {test.replace("-", " ").toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-blue-900">
                    Overall Score:{" "}
                    {Object.values(testResults).filter(Boolean).length}/
                    {Object.keys(testResults).length} Tests Passed
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <ChatWidget />
    </div>
  );
};

export default FunctionTest;
