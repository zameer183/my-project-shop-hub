import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import GlobalHeader from "@/components/ecommerce/GlobalHeader";
import BannerSlider from "@/components/ecommerce/BannerSlider";
import CartSidebar from "@/components/ecommerce/CartSidebar";
import WishlistSidebar from "@/components/ecommerce/WishlistSidebar";
import ProductCard from "@/components/ecommerce/ProductCard";
import ChatWidget from "@/components/ecommerce/ChatWidget";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/contexts/ProductContext";
import { useGlobal, formatPrice } from "@/contexts/GlobalContext";
import {
  Star,
  Clock,
  ShoppingCart,
  ArrowRight,
  Zap,
  Truck,
  Shield,
  Headphones,
  Heart,
  TrendingUp,
  Gift,
  Target,
  Users,
  Award,
  Globe,
  Smartphone,
  Laptop,
  Camera,
  Gamepad2,
  Shirt,
  Home,
  Car,
  Dumbbell,
  Palette,
  Baby,
  ChevronRight,
  MapPin,
  Package,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const {
    flashSaleProducts,
    featuredProducts,
    recommendedProducts,
    categories,
  } = useProducts();
  const { t, currency, location } = useGlobal();
  const globalCategories = [
    {
      name: "Electronics",
      icon: Smartphone,
      image: "/placeholder.svg",
      itemCount: "50k+ items",
      color: "from-blue-500 to-blue-600",
      href: "/category/electronics",
    },
    {
      name: "Fashion",
      icon: Shirt,
      image: "/placeholder.svg",
      itemCount: "30k+ items",
      color: "from-pink-500 to-pink-600",
      href: "/category/fashion",
    },
    {
      name: "Home & Living",
      icon: Home,
      image: "/placeholder.svg",
      itemCount: "25k+ items",
      color: "from-green-500 to-green-600",
      href: "/category/home",
    },
    {
      name: "Sports",
      icon: Dumbbell,
      image: "/placeholder.svg",
      itemCount: "15k+ items",
      color: "from-orange-500 to-orange-600",
      href: "/category/sports",
    },
    {
      name: "Beauty",
      icon: Palette,
      image: "/placeholder.svg",
      itemCount: "20k+ items",
      color: "from-purple-500 to-purple-600",
      href: "/category/beauty",
    },
    {
      name: "Automotive",
      icon: Car,
      image: "/placeholder.svg",
      itemCount: "10k+ items",
      color: "from-red-500 to-red-600",
      href: "/category/automotive",
    },
  ];

  const globalFeatures = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "Shop from sellers in 200+ countries",
      color: "text-blue-500",
    },
    {
      icon: Shield,
      title: "Buyer Protection",
      description: "100% secure with money-back guarantee",
      color: "text-green-500",
    },
    {
      icon: Truck,
      title: "Worldwide Shipping",
      description: "Fast delivery to your doorstep",
      color: "text-purple-500",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Multilingual customer service",
      color: "text-orange-500",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      comment:
        "Amazing products from global sellers! Fast shipping and great quality.",
      avatar: "/placeholder.svg",
      verified: true,
    },
    {
      name: "Ahmed Al-Rashid",
      location: "Dubai, UAE",
      rating: 5,
      comment:
        "Love the variety and international options. Customer service is excellent!",
      avatar: "/placeholder.svg",
      verified: true,
    },
    {
      name: "Maria García",
      location: "Madrid, Spain",
      rating: 5,
      comment:
        "Best marketplace for finding unique items from around the world.",
      avatar: "/placeholder.svg",
      verified: true,
    },
  ];

  const countryStats = [
    { country: "🇺🇸 USA", sellers: "500K+", flag: "🇺🇸" },
    { country: "🇨🇳 China", sellers: "800K+", flag: "🇨🇳" },
    { country: "🇩🇪 Germany", sellers: "200K+", flag: "🇩🇪" },
    { country: "🇬🇧 UK", sellers: "150K+", flag: "🇬🇧" },
    { country: "🇯🇵 Japan", sellers: "300K+", flag: "🇯🇵" },
    { country: "🇰🇷 Korea", sellers: "180K+", flag: "🇰🇷" },
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free delivery on orders over $50",
      color: "text-blue-500",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure and encrypted",
      color: "text-green-500",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer service",
      color: "text-purple-500",
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "Certified products only",
      color: "text-orange-500",
    },
  ];

  const stats = [
    { icon: Users, label: "Happy Customers", value: "2M+" },
    { icon: Gift, label: "Products Sold", value: "50M+" },
    { icon: Award, label: "Awards Won", value: "150+" },
    { icon: Target, label: "Satisfaction Rate", value: "99%" },
  ];

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice,
      originalPrice: product.originalPrice,
      image: product.image,
      category: "Electronics", // Default category
    });
  };

  const handleToggleWishlist = (product: any) => {
    if (isInWishlist(product.id)) {
      // Remove from wishlist logic would go here
      return;
    }
    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.salePrice,
      originalPrice: product.originalPrice,
      image: product.image,
      rating: product.rating,
      reviews: product.reviews,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  {t("hero.title")}
                </h1>
                <p className="text-xl md:text-2xl text-blue-100">
                  {t("hero.subtitle")}
                </p>
              </div>

              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Delivering to {location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>200+ Countries</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                  asChild
                >
                  <Link to="/shopping">
                    Start Shopping
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                  asChild
                >
                  <Link to="/seller/register">
                    Become a Seller
                    <Package className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>2M+ Happy Customers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span>Secure Payments</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {countryStats.map((stat, index) => (
                  <Card
                    key={index}
                    className="bg-white/10 backdrop-blur border-white/20"
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{stat.flag}</div>
                      <div className="font-semibold">{stat.sellers}</div>
                      <div className="text-sm text-blue-100">
                        {stat.country.replace(/🇺🇸|🇨🇳|🇩🇪|🇬🇧|🇯🇵|🇰🇷/g, "").trim()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Slider */}
      <section className="container mx-auto px-4 py-8">
        <BannerSlider />
      </section>

      {/* Global Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Why Shop Globally with Us?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the world of shopping with unmatched convenience and
              security
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {globalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-all duration-300 group"
                >
                  <CardContent className="pt-8 pb-6">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 mb-6 group-hover:scale-110 transition-transform ${feature.color}`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-3">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{t("flash.sale")}</h2>
                  <p className="text-muted-foreground">
                    Limited time offers from global sellers
                  </p>
                </div>
              </div>
              <Badge
                variant="destructive"
                className="animate-pulse text-sm px-3 py-1"
              >
                <Clock className="h-4 w-4 mr-2" />
                {t("flash.ends")} 24h
              </Badge>
            </div>
            <Button variant="outline" asChild>
              <Link to="/deals">
                View All Deals
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashSaleProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="default"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Global Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("categories.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("categories.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {globalCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
                  asChild
                >
                  <Link to={category.href}>
                    <CardContent className="p-0">
                      <div
                        className={`relative h-32 bg-gradient-to-br ${category.color} flex items-center justify-center`}
                      >
                        <Icon className="h-12 w-12 text-white group-hover:scale-110 transition-transform" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="font-semibold mb-1 group-hover:text-blue-600 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {category.itemCount}
                        </p>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Electronics Product Showcase Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <img
                  src="https://www.sofeast.com/wp-content/uploads/2020/11/11-Common-Electronic-Products-Compliance-Requirements.jpg"
                  alt="Electronic Products Showcase"
                  className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />

                {/* Floating badges */}
                <div className="absolute top-6 left-6">
                  <Badge className="bg-green-500 text-white border-0">
                    <Shield className="h-3 w-3 mr-1" />
                    Certified Products
                  </Badge>
                </div>
                <div className="absolute top-6 right-6">
                  <Badge className="bg-blue-500 text-white border-0">
                    <Award className="h-3 w-3 mr-1" />
                    Quality Assured
                  </Badge>
                </div>
                <div className="absolute bottom-6 left-6">
                  <Badge className="bg-purple-500 text-white border-0">
                    <Globe className="h-3 w-3 mr-1" />
                    Global Standards
                  </Badge>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <div>
                <Badge className="bg-blue-100 text-blue-700 mb-4">
                  📱 Electronics Category
                </Badge>
                <h2 className="text-4xl font-bold mb-4">
                  Premium Electronic Products
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Discover our extensive collection of certified electronic
                  products from trusted global manufacturers. All products meet
                  international compliance requirements and quality standards.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 rounded-lg p-2">
                      <Smartphone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Mobile Devices</h4>
                      <p className="text-sm text-muted-foreground">
                        Latest smartphones & tablets
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 rounded-lg p-2">
                      <Laptop className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Computers</h4>
                      <p className="text-sm text-muted-foreground">
                        Laptops & accessories
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 rounded-lg p-2">
                      <Headphones className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Audio</h4>
                      <p className="text-sm text-muted-foreground">
                        Headphones & speakers
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 rounded-lg p-2">
                      <Camera className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Photography</h4>
                      <p className="text-sm text-muted-foreground">
                        Cameras & equipment
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                  asChild
                >
                  <Link to="/category/electronics">
                    Browse Electronics
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/shopping">View All Categories</Link>
                </Button>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-sm">
                    Quality Guarantee
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  All electronic products are tested for compliance and come
                  with international warranty coverage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Recommended for You</h2>
              <p className="text-muted-foreground">
                Curated based on your location: {location}
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="default"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              What Our Global Customers Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Trusted by millions of shoppers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">
                          {testimonial.name}
                        </span>
                        {testimonial.verified && (
                          <Badge variant="outline" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Trusted by Millions Worldwide
            </h2>
            <p className="text-lg text-muted-foreground">
              Join our growing global community
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-primary mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Newsletter & App Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Globe className="h-12 w-12" />
                <div>
                  <h2 className="text-3xl font-bold">
                    Stay Connected Globally
                  </h2>
                  <p className="text-blue-100">
                    Get updates in your preferred language
                  </p>
                </div>
              </div>

              <p className="text-lg text-blue-100">
                Subscribe to receive personalized deals, new seller alerts, and
                exclusive offers from around the world.
              </p>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
                  />
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                  >
                    Subscribe
                  </Button>
                </div>

                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Multilingual support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>No spam guarantee</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Download Our App
                </h3>
                <p className="text-blue-100 mb-6">
                  Shop on the go with our mobile app
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    📱 App Store
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    📱 Google Play
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Global Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-3">
                  <Package className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl">GlobalMart</h3>
                  <p className="text-sm text-gray-400">
                    Your Global Shopping Paradise
                  </p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Connect with millions of buyers and sellers worldwide. Discover
                unique products, competitive prices, and exceptional service
                across 200+ countries.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Globe className="h-4 w-4 text-blue-400" />
                  <span>200+ Countries</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span>Secure Payments</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t("footer.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t("footer.contact")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/press"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Press
                  </Link>
                </li>
                <li>
                  <Link
                    to="/investor"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Investor Relations
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/help"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t("footer.help")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/returns"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t("footer.returns")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shipping"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    to="/track"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link
                    to="/disputes"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Dispute Resolution
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Selling</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/seller/register"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Become a Seller
                  </Link>
                </li>
                <li>
                  <Link
                    to="/seller/guide"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Seller Guide
                  </Link>
                </li>
                <li>
                  <Link
                    to="/seller/fees"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Fees & Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/seller/protection"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Seller Protection
                  </Link>
                </li>
                <li>
                  <Link
                    to="/affiliate"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Affiliate Program
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Global Features Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center space-x-2 text-sm">
                <Truck className="h-4 w-4 text-blue-400" />
                <span>Free Global Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="h-4 w-4 text-green-400" />
                <span>Buyer Protection</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MessageCircle className="h-4 w-4 text-purple-400" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Award className="h-4 w-4 text-orange-400" />
                <span>Quality Guaranteed</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex space-x-6">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  🌐 English
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  💱 {currency}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  📍 {location}
                </Button>
              </div>

              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                >
                  📘
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                >
                  🐦
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                >
                  📷
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                >
                  💼
                </Button>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                <p>&copy; 2024 GlobalMart. All rights reserved worldwide.</p>
                <div className="flex space-x-4">
                  <Link
                    to="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    to="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    to="/cookies"
                    className="hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </Link>
                  <Link
                    to="/gdpr"
                    className="hover:text-white transition-colors"
                  >
                    GDPR
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart and Wishlist Sidebars */}
      <CartSidebar />
      <WishlistSidebar />

      {/* Global Chat Support Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;
