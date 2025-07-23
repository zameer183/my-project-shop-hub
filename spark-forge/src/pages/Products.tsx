import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from "@/components/Layout";
import {
  Search,
  Filter,
  Star,
  ShoppingCart,
  Heart,
  Info,
  CheckCircle,
  AlertTriangle,
  Pill,
  Shield,
} from "lucide-react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "prescription", label: "Prescription Medicines" },
    { value: "otc", label: "Over-the-Counter" },
    { value: "vitamins", label: "Vitamins & Supplements" },
    { value: "firstaid", label: "First Aid" },
    { value: "baby", label: "Baby Care" },
    { value: "skincare", label: "Skin Care" },
  ];

  const products = [
    {
      id: 1,
      name: "Amoxicillin 500mg",
      genericName: "Amoxicillin",
      category: "prescription",
      price: 12.99,
      originalPrice: 18.99,
      inStock: true,
      stockCount: 45,
      rating: 4.8,
      reviews: 124,
      description: "Antibiotic for bacterial infections",
      requiresPrescription: true,
      manufacturer: "PharmaCorp",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Vitamin D3 1000 IU",
      genericName: "Cholecalciferol",
      category: "vitamins",
      price: 8.99,
      originalPrice: 12.99,
      inStock: true,
      stockCount: 120,
      rating: 4.6,
      reviews: 89,
      description: "Supports bone and immune health",
      requiresPrescription: false,
      manufacturer: "VitaHealth",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Ibuprofen 200mg",
      genericName: "Ibuprofen",
      category: "otc",
      price: 6.49,
      originalPrice: 8.99,
      inStock: true,
      stockCount: 78,
      rating: 4.7,
      reviews: 156,
      description: "Pain reliever and fever reducer",
      requiresPrescription: false,
      manufacturer: "MediRelief",
      image: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Bandage Kit",
      genericName: "First Aid Bandages",
      category: "firstaid",
      price: 15.99,
      originalPrice: 19.99,
      inStock: true,
      stockCount: 32,
      rating: 4.5,
      reviews: 67,
      description: "Complete bandage kit for minor wounds",
      requiresPrescription: false,
      manufacturer: "SafeCare",
      image: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Baby Aspirin 81mg",
      genericName: "Acetylsalicylic Acid",
      category: "otc",
      price: 4.99,
      originalPrice: 6.99,
      inStock: false,
      stockCount: 0,
      rating: 4.4,
      reviews: 92,
      description: "Low-dose aspirin for heart health",
      requiresPrescription: false,
      manufacturer: "HeartCare",
      image: "/placeholder.svg",
    },
    {
      id: 6,
      name: "Moisturizing Cream",
      genericName: "Hydrating Cream",
      category: "skincare",
      price: 11.99,
      originalPrice: 15.99,
      inStock: true,
      stockCount: 56,
      rating: 4.3,
      reviews: 43,
      description: "Gentle moisturizing cream for sensitive skin",
      requiresPrescription: false,
      manufacturer: "SkinSoft",
      image: "/placeholder.svg",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.genericName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (productId: number) => {
    console.log("Adding product to cart:", productId);
    // Add to cart logic would go here
  };

  const handleAddToWishlist = (productId: number) => {
    console.log("Adding product to wishlist:", productId);
    // Add to wishlist logic would go here
  };

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Medicine Catalog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our comprehensive selection of prescription and
              over-the-counter medications, vitamins, and health products.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search medicines, vitamins, or health products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="lg:w-64">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {filteredProducts.length} Product
              {filteredProducts.length !== 1 ? "s" : ""} Found
            </h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4" />
              <span>Prescription items require valid prescription</span>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No products found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-4">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg bg-muted"
                      />
                      {product.requiresPrescription && (
                        <Badge
                          variant="destructive"
                          className="absolute top-2 left-2"
                        >
                          <Shield className="h-3 w-3 mr-1" />
                          Rx Required
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge
                          variant="secondary"
                          className="absolute top-2 right-2"
                        >
                          Out of Stock
                        </Badge>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute bottom-2 right-2 bg-white"
                        onClick={() => handleAddToWishlist(product.id)}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription className="text-sm">
                        Generic: {product.genericName} • {product.manufacturer}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">
                        {product.description}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {/* Rating */}
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {product.rating} ({product.reviews} reviews)
                        </span>
                      </div>

                      {/* Stock Status */}
                      <div className="flex items-center space-x-2">
                        {product.inStock ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-secondary" />
                            <span className="text-sm text-secondary">
                              In Stock ({product.stockCount} available)
                            </span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="h-4 w-4 text-destructive" />
                            <span className="text-sm text-destructive">
                              Out of Stock
                            </span>
                          </>
                        )}
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-primary">
                              ${product.price}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                          {product.originalPrice > product.price && (
                            <Badge variant="secondary" className="text-xs">
                              Save $
                              {(product.originalPrice - product.price).toFixed(
                                2,
                              )}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <Button
                        className="w-full"
                        disabled={!product.inStock}
                        onClick={() => handleAddToCart(product.id)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>

                      {product.requiresPrescription && (
                        <p className="text-xs text-muted-foreground text-center">
                          <Pill className="h-3 w-3 inline mr-1" />
                          Prescription verification required at checkout
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;
