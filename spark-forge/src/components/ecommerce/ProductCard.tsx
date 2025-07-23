import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGlobal, formatPrice, convertPrice } from "@/contexts/GlobalContext";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/contexts/ProductContext";
import {
  Star,
  Heart,
  ShoppingCart,
  Eye,
  MapPin,
  Truck,
  Shield,
  Zap,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "detailed";
  showWishlist?: boolean;
  showQuickView?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = "default",
  showWishlist = true,
  showQuickView = true,
}) => {
  const { currency, t } = useGlobal();
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Convert price to current currency
  const convertedPrice = convertPrice(
    product.price,
    product.currency,
    currency,
  );
  const convertedOriginalPrice = product.originalPrice
    ? convertPrice(product.originalPrice, product.currency, currency)
    : null;

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: convertedPrice,
      originalPrice: convertedOriginalPrice,
      image: product.images[0],
      category: product.category,
      seller: product.seller.name,
      inStock: product.inStock,
      quantity: 1,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInWishlist(product.id)) {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: convertedPrice,
        originalPrice: convertedOriginalPrice,
        image: product.images[0],
        rating: product.rating,
        reviews: product.reviews,
        seller: product.seller.name,
      });
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  if (variant === "compact") {
    return (
      <Card className="w-full hover:shadow-lg transition-all duration-300 group">
        <Link to={`/product/${product.id}`}>
          <div className="relative">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-32 object-cover rounded-t-lg"
            />
            {discountPercentage > 0 && (
              <Badge
                variant="destructive"
                className="absolute top-2 left-2 text-xs"
              >
                -{discountPercentage}%
              </Badge>
            )}
            {product.isFlashSale && (
              <Badge className="absolute top-2 right-2 bg-orange-500 text-xs">
                <Zap className="h-3 w-3 mr-1" />
                Flash
              </Badge>
            )}
          </div>
          <CardContent className="p-3">
            <h3 className="font-medium text-sm truncate mb-1">
              {product.name}
            </h3>
            <div className="flex items-center space-x-1 mb-2">
              {renderStars(product.rating)}
              <span className="text-xs text-muted-foreground">
                ({product.reviews})
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-sm">
                  {formatPrice(convertedPrice, currency)}
                </span>
                {convertedOriginalPrice && (
                  <span className="text-xs text-muted-foreground line-through ml-1">
                    {formatPrice(convertedOriginalPrice, currency)}
                  </span>
                )}
              </div>
              <Button size="sm" onClick={handleAddToCart} className="h-7 px-2">
                <ShoppingCart className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Link>
      </Card>
    );
  }

  return (
    <Card
      className="w-full hover:shadow-xl transition-all duration-300 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`}>
        <CardHeader className="pb-4">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlays */}
            {discountPercentage > 0 && (
              <Badge variant="destructive" className="absolute top-3 left-3">
                -{discountPercentage}%
              </Badge>
            )}

            {product.isFlashSale && (
              <Badge className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500">
                <Zap className="h-3 w-3 mr-1" />
                Flash Sale
              </Badge>
            )}

            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  Out of Stock
                </Badge>
              </div>
            )}

            {/* Hover Actions */}
            <div
              className={`absolute inset-0 bg-black/0 transition-all duration-300 ${
                isHovered ? "bg-black/20" : ""
              }`}
            >
              <div
                className={`absolute top-3 right-3 space-y-2 transition-all duration-300 ${
                  isHovered
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                }`}
              >
                {showWishlist && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/90 backdrop-blur-sm hover:bg-white"
                    onClick={handleToggleWishlist}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isInWishlist(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }`}
                    />
                  </Button>
                )}

                {showQuickView && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/90 backdrop-blur-sm hover:bg-white"
                  >
                    <Eye className="h-4 w-4 text-gray-600" />
                  </Button>
                )}
              </div>

              {/* Quick Actions Bottom */}
              <div
                className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${
                  isHovered
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <Button
                  className="w-full bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {t("product.add.cart")}
                </Button>
              </div>
            </div>

            {/* Image Indicators */}
            {product.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0 space-y-3">
          {/* Product Name */}
          <h3 className="font-semibold text-base line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            {renderStars(product.rating)}
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews} {t("product.reviews")})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">
              {formatPrice(convertedPrice, currency)}
            </span>
            {convertedOriginalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(convertedOriginalPrice, currency)}
              </span>
            )}
          </div>

          {/* Seller Info */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{product.seller.location}</span>
            </div>
            {product.seller.verified && (
              <Badge variant="outline" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          {/* Shipping Info */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-green-600">
              <Truck className="h-3 w-3" />
              <span>
                {product.shippingInfo.freeShipping
                  ? "Free shipping"
                  : `Shipping ${formatPrice(product.shippingInfo.cost || 0, currency)}`}
              </span>
            </div>
            <span className="text-muted-foreground">
              {product.shippingInfo.estimatedDays}
            </span>
          </div>

          {/* Flash Sale Timer */}
          {product.isFlashSale && product.flashSaleEndTime && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1 text-red-600">
                  <Clock className="h-3 w-3" />
                  <span className="font-medium">Flash Sale ends in:</span>
                </div>
                <div className="font-mono font-bold text-red-600">
                  {/* You would implement a countdown timer here */}
                  23:45:12
                </div>
              </div>
              <div className="mt-2 bg-red-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: "65%" }} // Progress based on items sold
                />
              </div>
              <div className="mt-1 text-xs text-red-600">
                {product.stockCount - 10} left in stock
              </div>
            </div>
          )}

          {/* Stock Status */}
          {product.inStock && product.stockCount <= 10 && (
            <div className="text-sm text-orange-600 font-medium">
              Only {product.stockCount} left in stock!
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
