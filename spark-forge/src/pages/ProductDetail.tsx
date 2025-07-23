import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import GlobalHeader from "@/components/ecommerce/GlobalHeader";
import ProductCard from "@/components/ecommerce/ProductCard";
import { useProducts, Product } from "@/contexts/ProductContext";
import { useCart } from "@/contexts/CartContext";
import { useGlobal, formatPrice, convertPrice } from "@/contexts/GlobalContext";
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  MapPin,
  MessageCircle,
  Share2,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  Verified,
  Clock,
  Package,
  Award,
  ThumbsUp,
  Flag,
} from "lucide-react";

const ProductDetail = () => {
  const { productId } = useParams();
  const { getProduct, products, recommendedProducts } = useProducts();
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const { currency, t } = useGlobal();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<{
    color?: string;
    size?: string;
  }>({});

  useEffect(() => {
    if (productId) {
      const foundProduct = getProduct(parseInt(productId));
      setProduct(foundProduct || null);
    }
  }, [productId, getProduct]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/">Return to Homepage</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Convert prices to current currency
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

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: convertedPrice,
      originalPrice: convertedOriginalPrice,
      image: product.images[0],
      category: product.category,
      seller: product.seller.name,
      inStock: product.inStock,
      quantity,
    });
  };

  const handleToggleWishlist = () => {
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

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "/placeholder.svg",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Excellent product! Fast shipping and exactly as described. Highly recommended!",
      verified: true,
      helpful: 12,
    },
    {
      id: 2,
      user: "Ahmed Al-Rashid",
      avatar: "/placeholder.svg",
      rating: 4,
      date: "2024-01-10",
      comment:
        "Good quality product. Packaging could be better but overall satisfied.",
      verified: true,
      helpful: 8,
    },
    {
      id: 3,
      user: "Maria García",
      avatar: "/placeholder.svg",
      rating: 5,
      date: "2024-01-08",
      comment: "Amazing! Will definitely buy again.",
      verified: false,
      helpful: 5,
    },
  ];

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
            <Link
              to={`/category/${product.category.toLowerCase()}`}
              className="hover:text-foreground"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground truncate">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discountPercentage > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute top-4 left-4 text-sm"
                >
                  -{discountPercentage}% OFF
                </Badge>
              )}
              {product.isFlashSale && (
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500">
                  ⚡ Flash Sale
                </Badge>
              )}

              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur"
                    onClick={() =>
                      setSelectedImageIndex(
                        selectedImageIndex === 0
                          ? product.images.length - 1
                          : selectedImageIndex - 1,
                      )
                    }
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur"
                    onClick={() =>
                      setSelectedImageIndex(
                        (selectedImageIndex + 1) % product.images.length,
                      )
                    }
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      index === selectedImageIndex
                        ? "border-primary"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(convertedPrice, currency)}
                </span>
                {convertedOriginalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(convertedOriginalPrice, currency)}
                  </span>
                )}
              </div>
              {discountPercentage > 0 && (
                <p className="text-green-600 font-medium">
                  You save{" "}
                  {formatPrice(
                    convertedOriginalPrice! - convertedPrice,
                    currency,
                  )}{" "}
                  ({discountPercentage}%)
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.inStock ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-green-600 font-medium">In Stock</span>
                  {product.stockCount <= 10 && (
                    <span className="text-orange-600">
                      (Only {product.stockCount} left!)
                    </span>
                  )}
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Variants */}
            {product.variants && (
              <div className="space-y-4">
                {product.variants.color && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Color: {selectedVariant.color || "Select"}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.color.map((color) => (
                        <Button
                          key={color}
                          variant={
                            selectedVariant.color === color
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            setSelectedVariant({ ...selectedVariant, color })
                          }
                        >
                          {color}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {product.variants.size && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Size: {selectedVariant.size || "Select"}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.size.map((size) => (
                        <Button
                          key={size}
                          variant={
                            selectedVariant.size === size
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            setSelectedVariant({ ...selectedVariant, size })
                          }
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium mb-2 block">Quantity</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-medium text-lg w-8 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setQuantity(Math.min(product.stockCount, quantity + 1))
                  }
                  disabled={quantity >= product.stockCount}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {t("product.add.cart")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                disabled={!product.inStock}
              >
                {t("product.buy.now")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleToggleWishlist}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
            </div>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      {product.seller.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold">{product.seller.name}</h3>
                      {product.seller.verified && (
                        <Badge variant="outline" className="text-xs">
                          <Verified className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{product.seller.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{product.seller.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Responds {product.seller.responseTime}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Contact Seller
                      </Button>
                      <Button size="sm" variant="outline">
                        View Store
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">
                        {product.shippingInfo.freeShipping
                          ? "Free Shipping"
                          : `Shipping ${formatPrice(product.shippingInfo.cost || 0, currency)}`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Estimated delivery: {product.shippingInfo.estimatedDays}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Buyer Protection</p>
                      <p className="text-sm text-muted-foreground">
                        Full refund if item not as described
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({product.reviews})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div key={key} className="flex justify-between py-2">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {/* Reviews Summary */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">
                        {product.rating}
                      </div>
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">
                        Based on {product.reviews} reviews
                      </p>
                    </div>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div
                          key={rating}
                          className="flex items-center space-x-2"
                        >
                          <span className="text-sm w-8">{rating}★</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{
                                width: `${Math.random() * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-12">
                            {Math.floor(Math.random() * 50)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>
                            {review.user.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold">{review.user}</h4>
                            {review.verified && (
                              <Badge variant="outline" className="text-xs">
                                <Package className="h-3 w-3 mr-1" />
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                          <p className="text-muted-foreground mb-3">
                            {review.comment}
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              Helpful ({review.helpful})
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Flag className="h-3 w-3 mr-1" />
                              Report
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Recommended Products */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
