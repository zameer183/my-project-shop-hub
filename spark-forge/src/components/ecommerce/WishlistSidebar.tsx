import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { Heart, ShoppingCart, X, Star } from "lucide-react";

const WishlistSidebar = () => {
  const {
    wishlistItems,
    removeFromWishlist,
    addToCart,
    wishlistCount,
    isWishlistOpen,
    setIsWishlistOpen,
  } = useCart();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      category: "Electronics", // Default category
    });
    removeFromWishlist(item.id);
  };

  return (
    <Sheet open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
      <SheetContent side="right" className="w-[400px] flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5" />
            <span>Wishlist</span>
            {wishlistCount > 0 && (
              <Badge variant="secondary">{wishlistCount}</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="bg-muted rounded-full p-6 mb-4">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-muted-foreground mb-4">
                Save your favorite items for later!
              </p>
              <Button onClick={() => setIsWishlistOpen(false)}>
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{item.name}</h4>
                    <div className="flex items-center space-x-1 mt-1">
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
                        ({item.reviews})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-lg font-bold">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${item.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="mt-2 w-full"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default WishlistSidebar;
