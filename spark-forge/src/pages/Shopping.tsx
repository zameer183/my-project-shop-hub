import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import GlobalHeader from "@/components/ecommerce/GlobalHeader";
import ProductCard from "@/components/ecommerce/ProductCard";
import ChatWidget from "@/components/ecommerce/ChatWidget";
import { useProducts, ProductFilter } from "@/contexts/ProductContext";
import { useGlobal, formatPrice } from "@/contexts/GlobalContext";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  Filter,
  TrendingUp,
  Clock,
  Star,
  MapPin,
  Truck,
  Shield,
  Zap,
  Heart,
  ShoppingCart,
  ArrowUpDown,
  ChevronDown,
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Watch,
  Gamepad2,
  Shirt,
  Home,
  Car,
  Dumbbell,
  Palette,
  Baby,
  Gift,
  Sparkles,
  Target,
  Users,
  Globe,
  Award,
  Package,
} from "lucide-react";
import { Link } from "react-router-dom";

const Shopping = () => {
  const {
    products,
    searchProducts,
    featuredProducts,
    flashSaleProducts,
    recommendedProducts,
    categories,
    filters,
    setFilters,
    sort,
    setSort,
  } = useProducts();
  const { t, currency, location } = useGlobal();

  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const allCategories = [
    {
      id: "all",
      name: "All Products",
      icon: Package,
      count: products.length,
      color: "from-blue-500 to-purple-500",
    },
    {
      id: "electronics",
      name: "Electronics",
      icon: Smartphone,
      count: products.filter((p) => p.category === "Electronics").length,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "fashion",
      name: "Fashion",
      icon: Shirt,
      count: products.filter((p) => p.category === "Fashion").length,
      color: "from-pink-500 to-pink-600",
    },
    {
      id: "home",
      name: "Home & Living",
      icon: Home,
      count: products.filter((p) => p.category === "Home").length,
      color: "from-green-500 to-green-600",
    },
    {
      id: "sports",
      name: "Sports",
      icon: Dumbbell,
      count: products.filter((p) => p.category === "Sports").length,
      color: "from-orange-500 to-orange-600",
    },
    {
      id: "beauty",
      name: "Beauty",
      icon: Palette,
      count: products.filter((p) => p.category === "Beauty").length,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "automotive",
      name: "Automotive",
      icon: Car,
      count: products.filter((p) => p.category === "Automotive").length,
      color: "from-red-500 to-red-600",
    },
  ];

  const featuredCollections = [
    {
      title: "Flash Sale",
      subtitle: "Limited time offers",
      products: flashSaleProducts,
      badge: "🔥 Hot Deals",
      bgColor: "from-red-500 to-orange-500",
      image:
        "../../../images/f.avif",
      icon: "⚡",
    },
    {
      title: "Featured Products",
      subtitle: "Hand-picked by our team",
      products: featuredProducts,
      badge: "⭐ Staff Picks",
      bgColor: "from-blue-500 to-purple-500",
      image:
        "../../../images/Featured Products.avif",
      icon: "🏆",
    },
    {
      title: "Recommended for You",
      subtitle: `Based on your location: ${location}`,
      products: recommendedProducts,
      badge: "🎯 Personalized",
      bgColor: "from-green-500 to-teal-500",
      image:
        "../../../images/Recommended.avif",
      icon: "🎁",
    },
  ];

  const trendingSearches = [
    "iPhone 15",
    "MacBook Pro",
    "Samsung Galaxy",
    "Sony Headphones",
    "Nike Shoes",
    "Laptop",
    "Wireless Earbuds",
    "Smart Watch",
  ];

  const brands = Array.from(new Set(products.map((p) => p.brand))).sort();

  useEffect(() => {
    let filtered = products;

    // Apply category filter
    if (activeTab !== "all") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === activeTab.toLowerCase(),
      );
    }

    // Apply search query
    if (searchQuery) {
      filtered = searchProducts(searchQuery);
    }

    // Apply price range filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    // Apply brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }

    // Apply rating filter
    if (selectedRating) {
      filtered = filtered.filter((p) => p.rating >= selectedRating);
    }

    setFilteredProducts(filtered);
  }, [
    activeTab,
    searchQuery,
    priceRange,
    selectedBrands,
    selectedRating,
    products,
    searchProducts,
  ]);

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 2000]);
    setSelectedBrands([]);
    setSelectedRating(null);
    setActiveTab("all");
  };

  const hasActiveFilters =
    searchQuery ||
    priceRange[0] > 0 ||
    priceRange[1] < 2000 ||
    selectedBrands.length > 0 ||
    selectedRating !== null;

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-16 relative overflow-hidden">
        {/* Background Product Images */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 transform rotate-12">
            <img
              src="../../../images/Waches.avif"
              alt="Product"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="absolute top-20 right-20 transform -rotate-12">
            <img
              src="../../../images/absolute,avif"
              alt="Product"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="absolute bottom-20 left-20 transform rotate-6">
            <img
              src="../../../images/15.avif"
              alt="Product"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="absolute bottom-10 right-10 transform -rotate-6">
            <img
              src="../../../images/Sony WH-1000XM5 Headphones 1 - Copy.jpeg"
              alt="Product"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Start Your Global Shopping Journey
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-6">
              Discover millions of products from sellers worldwide
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for products, brands, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 text-lg pl-12 pr-4 bg-white/90 backdrop-blur text-gray-900 border-0"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              </div>

              {/* Trending Searches */}
              <div className="mt-4">
                <p className="text-sm text-blue-100 mb-2">Trending searches:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {trendingSearches.map((term) => (
                    <Button
                      key={term}
                      variant="outline"
                      size="sm"
                      className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-blue-600"
                      onClick={() => setSearchQuery(term)}
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-2xl font-bold">50M+</div>
                <div className="text-sm text-blue-100">Products</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-2xl font-bold">2M+</div>
                <div className="text-sm text-blue-100">Sellers</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-2xl font-bold">200+</div>
                <div className="text-sm text-blue-100">Countries</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-2xl font-bold">99%</div>
                <div className="text-sm text-blue-100">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Shopping Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Category Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 h-auto p-1">
            {allCategories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex flex-col items-center gap-2 py-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{category.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Promotional Banner */}
        <section className="mb-12">
          <Card className="overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 flex flex-col justify-center">
                <Badge className="bg-white/20 text-white border-white/30 w-fit mb-4">
                  🎉 Special Offer
                </Badge>
                <h2 className="text-3xl font-bold mb-4">Mega Sale Event</h2>
                <p className="text-lg mb-6 opacity-90">
                  Up to 70% OFF on selected items from top global brands.
                  Limited time only!
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">2M+</div>
                    <div className="text-xs">Products</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">200+</div>
                    <div className="text-xs">Countries</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-xs">Support</div>
                  </div>
                </div>
                <Button className="bg-white text-purple-600 hover:bg-gray-100 w-fit">
                  Shop Now
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="relative h-64 lg:h-auto">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F1a22e33f424f439880c218ac3be78ff0%2F124391307f9a47f19bdf6db65a6ec94f?format=webp&width=800"
                  alt="Shopping App Screenshot"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                {/* Floating Product Cards */}
                <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <img
                      src="../../../images/watches 11.jpeg"
                      alt="Product"
                      className="w-8 h-8 rounded object-cover"
                    />
                    <div className="text-xs text-gray-900">
                      <div className="font-semibold">iPhone 15</div>
                      <div className="text-red-600">-20% OFF</div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-white rounded-lg p-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <img
                      src="../../../images/shoose.jpeg"
                      alt="Product"
                      className="w-8 h-8 rounded object-cover"
                    />
                    <div className="text-xs text-gray-900">
                      <div className="font-semibold">Nike Shoes</div>
                      <div className="text-green-600">Free Ship</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Featured Collections */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredCollections.map((collection, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative h-32 overflow-hidden">
                  {/* Background Image */}
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${collection.bgColor} opacity-80`}
                  />
                  {/* Content */}
                  <div className="relative flex items-center justify-center h-full">
                    <div className="text-center text-white">
                      <div className="text-3xl mb-2">{collection.icon}</div>
                      <h3 className="text-xl font-bold mb-1">
                        {collection.title}
                      </h3>
                      <p className="text-sm opacity-90">
                        {collection.subtitle}
                      </p>
                    </div>
                  </div>
                  {/* Badge */}
                  <Badge className="absolute top-3 right-3 bg-white/20 backdrop-blur text-white border-white/30">
                    {collection.badge}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {collection.products.length} products
                    </span>
                    <Button size="sm" variant="outline">
                      View All
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Filters and Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Filters</CardTitle>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={2000}
                    step={50}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatPrice(priceRange[0], currency)}</span>
                    <span>{formatPrice(priceRange[1], currency)}</span>
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="font-medium mb-3">Customer Rating</h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={selectedRating === rating}
                          onCheckedChange={(checked) =>
                            setSelectedRating(checked ? rating : null)
                          }
                        />
                        <label
                          htmlFor={`rating-${rating}`}
                          className="flex items-center space-x-1 cursor-pointer text-sm"
                        >
                          <div className="flex">
                            {[...Array(rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-3 w-3 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                            {[...Array(5 - rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-gray-300" />
                            ))}
                          </div>
                          <span>& up</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <h3 className="font-medium mb-3">Brand</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) =>
                            handleBrandChange(brand, checked)
                          }
                        />
                        <label
                          htmlFor={`brand-${brand}`}
                          className="text-sm cursor-pointer"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special Offers */}
                <div>
                  <h3 className="font-medium mb-3">Special Offers</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="free-shipping" />
                      <label
                        htmlFor="free-shipping"
                        className="text-sm cursor-pointer flex items-center"
                      >
                        <Truck className="h-3 w-3 mr-1" />
                        Free Shipping
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="on-sale" />
                      <label
                        htmlFor="on-sale"
                        className="text-sm cursor-pointer flex items-center"
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        On Sale
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="verified-seller" />
                      <label
                        htmlFor="verified-seller"
                        className="text-sm cursor-pointer flex items-center"
                      >
                        <Shield className="h-3 w-3 mr-1" />
                        Verified Seller
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort and View Controls */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {activeTab === "all"
                    ? "All Products"
                    : allCategories.find((c) => c.id === activeTab)?.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} products found
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sort Dropdown */}
                <Select defaultValue="newest">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {searchQuery && (
                  <Badge variant="secondary">
                    Search: "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery("")}
                      className="ml-1 hover:bg-gray-300 rounded"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {(priceRange[0] > 0 || priceRange[1] < 2000) && (
                  <Badge variant="secondary">
                    Price: {formatPrice(priceRange[0], currency)} -{" "}
                    {formatPrice(priceRange[1], currency)}
                    <button
                      onClick={() => setPriceRange([0, 2000])}
                      className="ml-1 hover:bg-gray-300 rounded"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedBrands.map((brand) => (
                  <Badge key={brand} variant="secondary">
                    Brand: {brand}
                    <button
                      onClick={() => handleBrandChange(brand, false)}
                      className="ml-1 hover:bg-gray-300 rounded"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                {selectedRating && (
                  <Badge variant="secondary">
                    {selectedRating}+ Stars
                    <button
                      onClick={() => setSelectedRating(null)}
                      className="ml-1 hover:bg-gray-300 rounded"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {/* Products Display */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "space-y-4"
                  }
                >
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      variant={viewMode === "list" ? "compact" : "default"}
                    />
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-8">
                  <Button variant="outline" size="lg">
                    Load More Products
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <ChatWidget />
    </div>
  );
};

export default Shopping;
