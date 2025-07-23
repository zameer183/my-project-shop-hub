import React, { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import GlobalHeader from "@/components/ecommerce/GlobalHeader";
import ProductCard from "@/components/ecommerce/ProductCard";
import {
  useProducts,
  ProductFilter,
  ProductSort,
} from "@/contexts/ProductContext";
import { useGlobal, formatPrice } from "@/contexts/GlobalContext";
import {
  Filter,
  Grid3X3,
  List,
  SlidersHorizontal,
  Star,
  Truck,
  Shield,
  ArrowUpDown,
  X,
  ArrowRight,
  Clock,
  Zap,
} from "lucide-react";

const ProductListing = () => {
  const [searchParams] = useSearchParams();
  const { categoryId } = useParams();
  const {
    products,
    searchProducts,
    getProductsByCategory,
    filters,
    setFilters,
    sort,
    setSort,
    loading,
    categories,
  } = useProducts();
  const { t, currency } = useGlobal();

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<ProductFilter>({});
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  const query = searchParams.get("q");
  const category = categoryId || searchParams.get("category");

  // Banner data from banner slider
  const dealBanners = [
    {
      id: 1,
      title: "Mega Electronics Sale",
      subtitle: "Up to 70% OFF",
      description:
        "Latest smartphones, laptops, and gadgets at unbeatable prices",
      image:
        "../../../images/11.avif",
      gradient: "from-blue-600 via-purple-600 to-pink-600",
      cta: "Shop Electronics",
      badge: "Limited Time",
      discount: "70% OFF",
    },
    {
      id: 2,
      title: "Fashion Week Special",
      subtitle: "Buy 2 Get 1 FREE",
      description: "Trendy clothing, shoes, and accessories for all seasons",
      image:
        "../../../images/images 1.jpeg",
      gradient: "from-pink-500 via-rose-500 to-orange-500",
      cta: "Explore Fashion",
      badge: "New Collection",
      discount: "Buy 2 Get 1 FREE",
    },
    {
      id: 3,
      title: "Home & Living Essentials",
      subtitle: "Transform Your Space",
      description: "Beautiful furniture, decor, and home appliances",
      image:
        "../../../images/Essentials.avif",
      gradient: "from-green-500 via-teal-500 to-blue-500",
      cta: "Shop Home",
      badge: "Best Sellers",
      discount: "50% OFF",
    },
    {
      id: 4,
      title: "Phone 15 Pro Max",
      subtitle: "Titanium. So Strong. So Light. So Pro.",
      description:
        "The ultimate iPhone with titanium design, A17 Pro chip, and Pro camera system",
      image:
        "../../../images/iphone 15.avif",
      gradient: "from-slate-600 via-gray-700 to-slate-800",
      cta: "Buy iPhone",
      badge: "Latest Model",
      discount: "$200 OFF",
    },
    {
      id: 5,
      title: "Sony WH-1000XM5 Headphones",
      subtitle: "Industry Leading Noise Canceling",
      description:
        "Premium wireless headphones with exceptional sound quality and 30-hour battery",
      image:
        "../../../images/Headphones.avif",
      gradient: "from-indigo-600 via-blue-700 to-cyan-600",
      cta: "Shop Audio",
      badge: "Best Seller",
      discount: "25% OFF",
    },
        {
      id: 12,
      title: "Phone 15 Pro Max",
      subtitle: "Titanium. So Strong. So Light. So Pro.",
      description:
        "The ultimate iPhone with titanium design, A17 Pro chip, and Pro camera system",
      image:
        "../../../images/iphone 15 11.jpeg",
      gradient: "from-slate-600 via-gray-700 to-slate-800",
      cta: "Buy iPhone",
      badge: "Latest Model",
      discount: "$200 OFF",
    },
    {
      id: 11,
      title: "Sony WH-1000XM5 Headphones",
      subtitle: "Industry Leading Noise Canceling",
      description:
        "Premium wireless headphones with exceptional sound quality and 30-hour battery",
      image:
        "../../../images/Sony WH-1000XM5 Headphones 4.jpeg",
      gradient: "from-indigo-600 via-blue-700 to-cyan-600",
      cta: "Shop Audio",
      badge: "Best Seller",
      discount: "25% OFF",
    },
    {
      id: 6,
      title: "Gaming Universe",
      subtitle: "Level Up",
      description:
        "Latest gaming consoles, accessories, and digital entertainment",
      image:
        "../../../images/Gaming Universe 5.jpeg",
      gradient: "from-purple-600 via-blue-600 to-cyan-500",
      cta: "Shop Gaming",
      badge: "Gamer's Paradise",
      discount: "40% OFF",
    },
  ];

  useEffect(() => {
    let results = products;

    if (query) {
      results = searchProducts(query, localFilters);
    } else if (category) {
      results = getProductsByCategory(category);
      // Apply additional filters
      if (Object.keys(localFilters).length > 0) {
        results = searchProducts("", { ...localFilters, category });
      }
    }

    setFilteredProducts(results);
  }, [
    query,
    category,
    localFilters,
    products,
    searchProducts,
    getProductsByCategory,
  ]);

  const brands = Array.from(new Set(products.map((p) => p.brand))).sort();

  const handleFilterChange = (key: keyof ProductFilter, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    setFilters(newFilters);
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
    handleFilterChange("priceRange", range);
  };

  const handleSortChange = (value: string) => {
    const [field, direction] = value.split("-") as [
      ProductSort["field"],
      ProductSort["direction"],
    ];
    const newSort = { field, direction };
    setSort(newSort);
  };

  const clearFilters = () => {
    setLocalFilters({});
    setFilters({});
    setPriceRange([0, 2000]);
  };

  const activeFilterCount = Object.keys(localFilters).filter(
    (key) => localFilters[key as keyof ProductFilter] !== undefined,
  ).length;

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <div className="flex items-center justify-between">
          <span className="font-semibold">Filters ({activeFilterCount})</span>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        </div>
      )}

      {/* Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${cat}`}
                checked={localFilters.category === cat}
                onCheckedChange={(checked) =>
                  handleFilterChange("category", checked ? cat : undefined)
                }
              />
              <label
                htmlFor={`category-${cat}`}
                className="text-sm cursor-pointer"
              >
                {cat}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            min={0}
            max={2000}
            step={50}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <span>{formatPrice(priceRange[0], currency)}</span>
            <span>{formatPrice(priceRange[1], currency)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Rating */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={localFilters.rating === rating}
                onCheckedChange={(checked) =>
                  handleFilterChange("rating", checked ? rating : undefined)
                }
              />
              <label
                htmlFor={`rating-${rating}`}
                className="flex items-center space-x-1 cursor-pointer"
              >
                <div className="flex items-center">
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
                <span className="text-sm">& up</span>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Brand */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Brand</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 max-h-40 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={localFilters.brand?.includes(brand) || false}
                onCheckedChange={(checked) => {
                  const currentBrands = localFilters.brand || [];
                  const newBrands = checked
                    ? [...currentBrands, brand]
                    : currentBrands.filter((b) => b !== brand);
                  handleFilterChange(
                    "brand",
                    newBrands.length ? newBrands : undefined,
                  );
                }}
              />
              <label
                htmlFor={`brand-${brand}`}
                className="text-sm cursor-pointer"
              >
                {brand}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Special Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Special Offers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="free-shipping"
              checked={localFilters.freeShipping || false}
              onCheckedChange={(checked) =>
                handleFilterChange("freeShipping", checked || undefined)
              }
            />
            <label
              htmlFor="free-shipping"
              className="flex items-center space-x-1 cursor-pointer"
            >
              <Truck className="h-3 w-3" />
              <span className="text-sm">Free Shipping</span>
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="on-sale"
              checked={localFilters.onSale || false}
              onCheckedChange={(checked) =>
                handleFilterChange("onSale", checked || undefined)
              }
            />
            <label htmlFor="on-sale" className="text-sm cursor-pointer">
              On Sale
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={localFilters.inStock || false}
              onCheckedChange={(checked) =>
                handleFilterChange("inStock", checked || undefined)
              }
            />
            <label htmlFor="in-stock" className="text-sm cursor-pointer">
              In Stock Only
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">
                {query
                  ? `Search Results for "${query}"`
                  : `${category || "All Products"}`}
              </h1>
              <p className="text-muted-foreground">
                {filteredProducts.length} products found
              </p>
            </div>

            {/* View Toggle & Sort */}
            <div className="flex items-center space-x-4">
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

              <Select
                onValueChange={handleSortChange}
                defaultValue="createdAt-desc"
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating-desc">Highest Rated</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="createdAt-desc">Newest First</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Toggle */}
              <Sheet
                open={isMobileFilterOpen}
                onOpenChange={setIsMobileFilterOpen}
              >
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="py-6">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {localFilters.category && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {localFilters.category}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleFilterChange("category", undefined)}
                  />
                </Badge>
              )}
              {localFilters.priceRange && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {formatPrice(localFilters.priceRange[0], currency)} -{" "}
                  {formatPrice(localFilters.priceRange[1], currency)}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleFilterChange("priceRange", undefined)}
                  />
                </Badge>
              )}
              {localFilters.rating && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {localFilters.rating}+ Stars
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleFilterChange("rating", undefined)}
                  />
                </Badge>
              )}
              {localFilters.freeShipping && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Free Shipping
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() =>
                      handleFilterChange("freeShipping", undefined)
                    }
                  />
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Promotional Banners Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Deals & Offers</h2>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Limited Time Only
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dealBanners.map((banner) => (
              <Card
                key={banner.id}
                className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border-0"
              >
                <div
                  className={`relative h-64 bg-gradient-to-r ${banner.gradient}`}
                >
                  {/* Background Image */}
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40" />

                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white border-0 px-3 py-1 text-sm font-bold">
                      <Zap className="h-3 w-3 mr-1" />
                      {banner.discount}
                    </Badge>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
                    >
                      {banner.badge}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold leading-tight">
                        {banner.title}
                      </h3>
                      <p className="text-lg font-semibold text-white/90">
                        {banner.subtitle}
                      </p>
                      <p className="text-sm text-white/80 line-clamp-2">
                        {banner.description}
                      </p>

                      <Button
                        className="mt-3 bg-white text-slate-900 hover:bg-white/90 w-fit"
                        size="sm"
                      >
                        {banner.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Call to Action Section */}
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Don't Miss Out!</h3>
              <p className="text-lg mb-4">
                These amazing deals won't last forever. Shop now and save big!
              </p>
              <div className="flex items-center justify-center gap-4">
                <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                  <Clock className="h-4 w-4 mr-2" />
                  Ends Soon
                </Badge>
                <Button className="bg-white text-blue-600 hover:bg-white/90">
                  Shop All Deals
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 h-64 rounded-lg mb-4" />
                    <div className="bg-gray-200 h-4 rounded mb-2" />
                    <div className="bg-gray-200 h-4 rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
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
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-6"
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
            )}

            {/* Load More */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
