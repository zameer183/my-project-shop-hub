import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/ecommerce/Navbar";
import CartSidebar from "@/components/ecommerce/CartSidebar";
import WishlistSidebar from "@/components/ecommerce/WishlistSidebar";
import { useCart } from "@/contexts/CartContext";
import { Star, ShoppingCart, Heart, Filter, Grid, List } from "lucide-react";

const Category = () => {
  const { categoryId } = useParams();
  const { addToCart, addToWishlist, isInWishlist } = useCart();

  // Mock products data based on category
  const getProductsByCategory = (category: string) => {
    const allProducts = {
      electronics: [
        {
          id: 1,
          name: "iPhone 15 Pro Max",
          price: 999,
          originalPrice: 1199,
          rating: 4.8,
          reviews: 1247,
          image: "/placeholder.svg",
          inStock: true,
        },
        {
          id: 2,
          name: "Samsung Galaxy S24",
          price: 699,
          originalPrice: 899,
          rating: 4.7,
          reviews: 892,
          image: "/placeholder.svg",
          inStock: true,
        },
        {
          id: 3,
          name: "MacBook Air M3",
          price: 1099,
          originalPrice: 1299,
          rating: 4.9,
          reviews: 567,
          image: "/placeholder.svg",
          inStock: true,
        },
      ],
      fashion: [
        {
          id: 4,
          name: "Nike Air Jordan",
          price: 199,
          originalPrice: 249,
          rating: 4.6,
          reviews: 324,
          image: "/placeholder.svg",
          inStock: true,
        },
        {
          id: 5,
          name: "Adidas T-Shirt",
          price: 49,
          originalPrice: 69,
          rating: 4.5,
          reviews: 156,
          image: "/placeholder.svg",
          inStock: true,
        },
      ],
      home: [
        {
          id: 6,
          name: "Wooden Coffee Table",
          price: 299,
          originalPrice: 399,
          rating: 4.4,
          reviews: 89,
          image: "/placeholder.svg",
          inStock: true,
        },
      ],
    };

    return allProducts[category as keyof typeof allProducts] || [];
  };

  const products = getProductsByCategory(categoryId || "");

  const getCategoryTitle = (category: string) => {
    const titles = {
      electronics: "Electronics & Gadgets",
      fashion: "Fashion & Apparel",
      home: "Home & Living",
      beauty: "Health & Beauty",
      sports: "Sports & Outdoors",
      automotive: "Automotive",
    };
    return titles[category as keyof typeof titles] || "Category";
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: categoryId || "general",
    });
  };

  const handleToggleWishlist = (product: any) => {
    if (isInWishlist(product.id)) {
      return;
    }
    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      rating: product.rating,
      reviews: product.reviews,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">
              {getCategoryTitle(categoryId || "")}
            </h1>
            <p className="text-muted-foreground">
              Discover amazing products in this category
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-8 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <span className="text-sm text-muted-foreground">
                {products.length} products found
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                No products found in this category
              </h3>
              <p className="text-muted-foreground">
                Please check back later or browse other categories
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="hover:shadow-lg transition-all duration-300 group"
                >
                  <CardHeader className="pb-4">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      {product.originalPrice > product.price && (
                        <Badge
                          variant="destructive"
                          className="absolute top-2 left-2"
                        >
                          -
                          {Math.round(
                            ((product.originalPrice - product.price) /
                              product.originalPrice) *
                              100,
                          )}
                          %
                        </Badge>
                      )}
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleToggleWishlist(product)}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            isInWishlist(product.id)
                              ? "fill-red-500 text-red-500"
                              : ""
                          }`}
                        />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <h3 className="font-semibold mb-2 truncate">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-1 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xl font-bold text-primary">
                        ${product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <CartSidebar />
      <WishlistSidebar />
    </div>
  );
};

export default Category;
