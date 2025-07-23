import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useCart } from "@/contexts/CartContext";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  ChevronDown,
  Smartphone,
  Laptop,
  Gamepad2,
  Shirt,
  Home,
  Baby,
  Car,
  Dumbbell,
  Book,
  Store,
  Globe,
  Truck,
  Shield,
  Headphones,
} from "lucide-react";

const Navbar = () => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const {
    searchQuery,
    setSearchQuery,
    cartCount,
    wishlistCount,
    setIsCartOpen,
    setIsWishlistOpen,
  } = useCart();

  const categories = [
    {
      id: "electronics",
      name: "Electronics",
      icon: Smartphone,
      subcategories: [
        {
          name: "Mobile Phones",
          items: ["Smartphones", "Feature Phones", "Accessories"],
        },
        { name: "Computers", items: ["Laptops", "Desktops", "Tablets"] },
        { name: "Audio", items: ["Headphones", "Speakers", "Earphones"] },
        { name: "Gaming", items: ["Consoles", "Games", "Accessories"] },
      ],
    },
    {
      id: "fashion",
      name: "Fashion",
      icon: Shirt,
      subcategories: [
        { name: "Men's Fashion", items: ["Shirts", "Pants", "Shoes"] },
        { name: "Women's Fashion", items: ["Dresses", "Tops", "Shoes"] },
        { name: "Kids Fashion", items: ["Boys", "Girls", "Baby"] },
        { name: "Accessories", items: ["Bags", "Watches", "Jewelry"] },
      ],
    },
    {
      id: "home",
      name: "Home & Living",
      icon: Home,
      subcategories: [
        { name: "Furniture", items: ["Sofas", "Tables", "Chairs"] },
        { name: "Decor", items: ["Lighting", "Wall Art", "Plants"] },
        { name: "Kitchen", items: ["Appliances", "Cookware", "Storage"] },
        { name: "Bedding", items: ["Sheets", "Pillows", "Blankets"] },
      ],
    },
    {
      id: "beauty",
      name: "Health & Beauty",
      icon: Heart,
      subcategories: [
        { name: "Skincare", items: ["Face Care", "Body Care", "Sun Care"] },
        { name: "Makeup", items: ["Face", "Eyes", "Lips"] },
        { name: "Hair Care", items: ["Shampoo", "Styling", "Tools"] },
        { name: "Health", items: ["Vitamins", "Medicine", "Equipment"] },
      ],
    },
    {
      id: "sports",
      name: "Sports & Outdoors",
      icon: Dumbbell,
      subcategories: [
        { name: "Fitness", items: ["Equipment", "Apparel", "Supplements"] },
        { name: "Outdoor", items: ["Camping", "Hiking", "Cycling"] },
        { name: "Sports", items: ["Football", "Basketball", "Tennis"] },
        { name: "Water Sports", items: ["Swimming", "Diving", "Surfing"] },
      ],
    },
    {
      id: "automotive",
      name: "Automotive",
      icon: Car,
      subcategories: [
        { name: "Car Parts", items: ["Engine", "Brakes", "Suspension"] },
        { name: "Accessories", items: ["Interior", "Exterior", "Electronics"] },
        { name: "Motorcycle", items: ["Parts", "Accessories", "Gear"] },
        { name: "Tools", items: ["Hand Tools", "Power Tools", "Equipment"] },
      ],
    },
  ];

  const quickLinks = [
    { name: "Flash Sale", href: "/flash-sale", color: "text-red-500" },
    { name: "New Arrivals", href: "/new-arrivals", color: "text-green-500" },
    { name: "Best Sellers", href: "/best-sellers", color: "text-blue-500" },
    { name: "Clearance", href: "/clearance", color: "text-orange-500" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
    setShowMegaMenu(false);
  };

  return (
    <div className="sticky top-0 z-50 bg-background border-b shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <Truck className="h-3 w-3" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="h-3 w-3" />
              <span>100% Secure Shopping</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Headphones className="h-3 w-3" />
              <span>24/7 Support: +1 (555) 123-4567</span>
            </div>
            <Select defaultValue="en">
              <SelectTrigger className="h-6 w-16 text-xs border-0 bg-transparent">
                <Globe className="h-3 w-3 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="es">ES</SelectItem>
                <SelectItem value="fr">FR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-2">
              <Store className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Barakah Mart
              </h1>
              <p className="text-xs text-muted-foreground">
                Your Shopping Paradise
              </p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-12 bg-muted/30 border-0 rounded-xl focus:bg-background transition-colors"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg"
              >
                Search
              </Button>
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => setIsWishlistOpen(true)}
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 text-xs flex items-center justify-center"
                >
                  {wishlistCount}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 text-xs flex items-center justify-center"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5 mr-2" />
                  Account
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  My Orders
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <div className="space-y-4 mt-4">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <div key={category.id} className="space-y-2">
                        <div className="flex items-center space-x-2 font-medium">
                          <Icon className="h-4 w-4" />
                          <span>{category.name}</span>
                        </div>
                        <div className="pl-6 space-y-1">
                          {category.subcategories.map((sub) => (
                            <Link
                              key={sub.name}
                              to={`/category/${category.id}/${sub.name.toLowerCase().replace(/\s+/g, "-")}`}
                              className="block text-sm text-muted-foreground hover:text-foreground"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="border-t py-3 hidden md:block">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    className="relative"
                    onMouseEnter={() => {
                      setActiveCategory(category.id);
                      setShowMegaMenu(true);
                    }}
                    onMouseLeave={() => {
                      setShowMegaMenu(false);
                      setActiveCategory("");
                    }}
                  >
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 text-sm font-medium"
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{category.name}</span>
                    </Button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center space-x-6">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-medium hover:underline ${link.color}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mega Menu */}
          {showMegaMenu && activeCategory && (
            <div
              className="absolute left-0 right-0 top-full bg-background border-t shadow-lg z-40"
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <div className="container mx-auto px-4 py-8">
                {categories
                  .filter((cat) => cat.id === activeCategory)
                  .map((category) => (
                    <div key={category.id} className="grid grid-cols-4 gap-8">
                      {category.subcategories.map((subcategory) => (
                        <div key={subcategory.name} className="space-y-3">
                          <h3 className="font-semibold text-foreground border-b pb-2">
                            {subcategory.name}
                          </h3>
                          <ul className="space-y-2">
                            {subcategory.items.map((item) => (
                              <li key={item}>
                                <Link
                                  to={`/category/${category.id}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
