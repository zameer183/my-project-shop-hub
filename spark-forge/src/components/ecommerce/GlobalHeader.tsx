import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useGlobal, formatPrice } from "@/contexts/GlobalContext";
import { useUser } from "@/contexts/UserContext";
import { useCart } from "@/contexts/CartContext";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  Globe,
  MapPin,
  ChevronDown,
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Watch,
  Gamepad2,
  Shirt,
  Zap,
  Home,
  Car,
  Dumbbell,
  Palette,
  Baby,
  Gift,
  Building2,
  LogOut,
  Settings,
  Package,
  Star,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const GlobalHeader = () => {
  const {
    language,
    setLanguage,
    currency,
    setCurrency,
    location,
    setLocation,
    t,
  } = useGlobal();
  const { user, isAuthenticated, logout } = useUser();
  const { cartItems, wishlistItems } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ];

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "PKR", name: "Pakistani Rupee", symbol: "₨" },
    { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  ];

  const locations = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Spain",
    "Pakistan",
    "UAE",
    "Saudi Arabia",
  ];

  const megaMenuCategories = [
    {
      title: "Electronics",
      icon: Zap,
      subcategories: [
        {
          name: "Smartphones",
          icon: Smartphone,
          href: "/category/smartphones",
        },
        { name: "Laptops", icon: Laptop, href: "/category/laptops" },
        { name: "Headphones", icon: Headphones, href: "/category/headphones" },
        { name: "Cameras", icon: Camera, href: "/category/cameras" },
        { name: "Smart Watches", icon: Watch, href: "/category/watches" },
        { name: "Gaming", icon: Gamepad2, href: "/category/gaming" },
      ],
    },
    {
      title: "Fashion",
      icon: Shirt,
      subcategories: [
        { name: "Men's Clothing", icon: Shirt, href: "/category/mens-fashion" },
        {
          name: "Women's Clothing",
          icon: Shirt,
          href: "/category/womens-fashion",
        },
        { name: "Shoes", icon: Shirt, href: "/category/shoes" },
        { name: "Accessories", icon: Watch, href: "/category/accessories" },
        { name: "Bags", icon: Gift, href: "/category/bags" },
        { name: "Jewelry", icon: Star, href: "/category/jewelry" },
      ],
    },
    {
      title: "Home & Living",
      icon: Home,
      subcategories: [
        { name: "Furniture", icon: Home, href: "/category/furniture" },
        { name: "Kitchen", icon: Home, href: "/category/kitchen" },
        { name: "Decor", icon: Palette, href: "/category/decor" },
        { name: "Garden", icon: Home, href: "/category/garden" },
        { name: "Tools", icon: Settings, href: "/category/tools" },
        { name: "Lighting", icon: Zap, href: "/category/lighting" },
      ],
    },
    {
      title: "Sports",
      icon: Dumbbell,
      subcategories: [
        {
          name: "Fitness Equipment",
          icon: Dumbbell,
          href: "/category/fitness",
        },
        { name: "Outdoor Sports", icon: Dumbbell, href: "/category/outdoor" },
        { name: "Team Sports", icon: Dumbbell, href: "/category/team-sports" },
        {
          name: "Water Sports",
          icon: Dumbbell,
          href: "/category/water-sports",
        },
        {
          name: "Winter Sports",
          icon: Dumbbell,
          href: "/category/winter-sports",
        },
        { name: "Athletic Wear", icon: Shirt, href: "/category/athletic-wear" },
      ],
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page using React Router
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      {/* Top Bar */}
      <div className="bg-slate-900 text-white text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span>📞 24/7 Customer Support: +1-800-SHOP-NOW</span>
            <span>🚚 Free shipping on orders over $50</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Follow us:</span>
            <div className="flex space-x-2">
              <a href="#" className="hover:text-blue-400">
                📘
              </a>
              <a href="#" className="hover:text-blue-400">
                🐦
              </a>
              <a href="#" className="hover:text-pink-400">
                📷
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-2">
                <Package className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">GlobalMart</h1>
                <p className="text-xs text-gray-500">Shop Worldwide</p>
              </div>
            </Link>

            {/* Location Selector */}
            <div className="hidden lg:flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-600" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm">
                    Deliver to: {location}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {locations.map((loc) => (
                    <DropdownMenuItem
                      key={loc}
                      onClick={() => setLocation(loc)}
                      className={location === loc ? "bg-blue-50" : ""}
                    >
                      {loc}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={t("nav.search")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 text-base border-2 border-gray-200 rounded-lg focus:border-blue-500"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Globe className="h-4 w-4 mr-2" />
                    {languages.find((l) => l.code === language)?.flag}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={language === lang.code ? "bg-blue-50" : ""}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Currency Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {currencies.find((c) => c.code === currency)?.symbol}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {currencies.map((curr) => (
                    <DropdownMenuItem
                      key={curr.code}
                      onClick={() => setCurrency(curr.code)}
                      className={currency === curr.code ? "bg-blue-50" : ""}
                    >
                      <span className="mr-2">{curr.symbol}</span>
                      {curr.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Account */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {isAuthenticated ? user?.firstName : "Account"}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {isAuthenticated ? (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/profile">
                          <User className="mr-2 h-4 w-4" />
                          My Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/orders">
                          <Package className="mr-2 h-4 w-4" />
                          My Orders
                        </Link>
                      </DropdownMenuItem>
                      {user?.role === "seller" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link to="/seller/dashboard">
                              <Building2 className="mr-2 h-4 w-4" />
                              Seller Dashboard
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      {user?.role === "admin" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link to="/admin/dashboard">
                              <Settings className="mr-2 h-4 w-4" />
                              Admin Panel
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/login">Sign In</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/register">Create Account</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/seller/register">Become a Seller</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Wishlist */}
              <Button variant="ghost" size="sm" asChild>
                <Link to="/wishlist" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlistItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs">
                      {wishlistItems.length}
                    </Badge>
                  )}
                </Link>
              </Button>

              {/* Cart */}
              <Button variant="ghost" size="sm" asChild>
                <Link to="/cart" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs">
                      {cartItems.length}
                    </Badge>
                  )}
                  <div className="ml-2 text-sm">
                    {cartItems.length > 0 && formatPrice(cartTotal, currency)}
                  </div>
                </Link>
              </Button>

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-2">
                        <Package className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold">GlobalMart</h2>
                        <p className="text-xs text-gray-500">Shop Worldwide</p>
                      </div>
                    </div>

                    {/* Mobile Categories */}
                    <div className="space-y-4">
                      {megaMenuCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <div key={category.title}>
                            <h3 className="font-semibold text-gray-900 flex items-center">
                              <Icon className="h-4 w-4 mr-2" />
                              {category.title}
                            </h3>
                            <div className="ml-6 mt-2 space-y-2">
                              {category.subcategories.map((sub) => (
                                <Link
                                  key={sub.name}
                                  to={sub.href}
                                  className="block text-sm text-gray-600 hover:text-blue-600"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mega Menu - Desktop */}
          <div className="hidden lg:block border-t">
            <NavigationMenu className="max-w-none">
              <NavigationMenuList className="space-x-8">
                {megaMenuCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <NavigationMenuItem key={category.title}>
                      <NavigationMenuTrigger className="h-12">
                        <Icon className="h-4 w-4 mr-2" />
                        {category.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid grid-cols-2 gap-4 p-6 w-96">
                          {category.subcategories.map((subcategory) => {
                            const SubIcon = subcategory.icon;
                            return (
                              <NavigationMenuLink
                                key={subcategory.name}
                                asChild
                              >
                                <Link
                                  to={subcategory.href}
                                  className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                  <SubIcon className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
                                  <span className="font-medium group-hover:text-blue-600">
                                    {subcategory.name}
                                  </span>
                                </Link>
                              </NavigationMenuLink>
                            );
                          })}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                })}

                {/* Special Links */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/deals"
                      className="h-12 px-4 py-2 flex items-center text-red-600 font-medium hover:text-red-700"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Flash Deals
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/seller/register"
                      className="h-12 px-4 py-2 flex items-center text-green-600 font-medium hover:text-green-700"
                    >
                      <Building2 className="h-4 w-4 mr-2" />
                      Sell on GlobalMart
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </header>
    </>
  );
};

export default GlobalHeader;
