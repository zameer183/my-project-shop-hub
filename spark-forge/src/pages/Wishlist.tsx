import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GlobalHeader from "@/components/ecommerce/GlobalHeader";
import { useCart } from "@/contexts/CartContext";
import { useGlobal, formatPrice } from "@/contexts/GlobalContext";
import { Heart, ShoppingCart, X, Star, Package, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, addToCart, clearWishlist } =
    useCart();
  const { currency, t } = useGlobal();

  const moveToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      category: "Electronics",
      seller: item.seller,
      inStock: true,
      quantity: 1,
    });
    removeFromWishlist(item.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <Heart className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-4">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-6">
              Save items you love to your wishlist and shop them later
            </p>
            <Button asChild>
              <Link to="/shopping">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Wishlist</span>
          </div>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            <p className="text-muted-foreground">
              {wishlistItems.length} items saved
            </p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={clearWishlist}>
              Clear All
            </Button>
            <Button variant="outline" asChild>
              <Link to="/shopping">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <Card
              key={item.id}
              className="hover:shadow-lg transition-all duration-300 group"
            >
              <CardHeader className="pb-4">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <h3 className="font-semibold mb-2 line-clamp-2">{item.name}</h3>

                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(item.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {item.rating} ({item.reviews})
                  </span>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold">
                    {formatPrice(item.price, currency)}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(item.originalPrice, currency)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-muted-foreground mb-4">
                  {item.seller}
                </p>

                <div className="space-y-2">
                  <Button className="w-full" onClick={() => moveToCart(item)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>

                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/product/${item.id}`}>
                      <Package className="h-4 w-4 mr-2" />
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recommendations */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* This would show recommended products based on wishlist items */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <img
                  src="/placeholder.svg"
                  alt="Recommended Product"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-2">Related Product</h3>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold">$299.99</span>
                  <Badge variant="secondary">New</Badge>
                </div>
                <Button className="w-full" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Add to Wishlist
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Wishlist;
