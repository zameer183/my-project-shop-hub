import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGlobal } from "@/contexts/GlobalContext";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Star,
  Palette,
  Sun,
  Moon,
  Sparkles,
} from "lucide-react";

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTheme, setCurrentTheme] = useState("gradient");
  const { theme } = useGlobal();

  // Theme configurations
  const themes = {
    gradient: {
      name: "Gradient",
      icon: Sparkles,
      banners: [
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
          textColor: "text-white",
        },
        {
          id: 2,
          title: "Fashion Week Special",
          subtitle: "Buy 2 Get 1 FREE",
          description:
            "Trendy clothing, shoes, and accessories for all seasons",
          image:
            "../../../../images/images 1.jpeg",
          gradient: "from-pink-500 via-rose-500 to-orange-500",
          cta: "Explore Fashion",
          badge: "New Collection",
          textColor: "text-white",
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
          textColor: "text-white",
        },
        {
          id: 4,
          title: "Books & Education",
          subtitle: "Feed Your Mind",
          description:
            "Discover knowledge with our vast collection of books and learning materials",
          image:
            "../../../images/Book.avif",
          gradient: "from-amber-500 via-orange-500 to-red-500",
          cta: "Explore Books",
          badge: "Knowledge Hub",
          textColor: "text-white",
        },
        {
          id: 5,
          title: "Gaming Universe",
          subtitle: "Level Up",
          description:
            "Latest gaming consoles, accessories, and digital entertainment",
          image:
            "../../../images/Gaming.avif",
          gradient: "from-purple-600 via-blue-600 to-cyan-500",
          cta: "Shop Gaming",
          badge: "Gamer's Paradise",
          textColor: "text-white",
        },
        {
          id: 6,
          title: "Travel & Luggage",
          subtitle: "Adventure Awaits",
          description:
            "Premium travel gear, luggage, and accessories for your journey",
          image:
            "../../../images/Travele.avif",
          gradient: "from-teal-500 via-green-500 to-emerald-600",
          cta: "Explore Travel",
          badge: "Wanderlust",
          textColor: "text-white",
        },
        {
          id: 7,
          title: "Jewelry & Watches",
          subtitle: "Sparkle & Shine",
          description:
            "Exquisite jewelry and luxury timepieces for special moments",
          image:
            "../../../images/jewelry.avif",
          gradient: "from-rose-500 via-pink-500 to-purple-600",
          cta: "Shop Jewelry",
          badge: "Luxury Collection",
          textColor: "text-white",
        },
        {
          id: 8,
          title: "iPhone 15 Pro Max",
          subtitle: "Titanium. So Strong. So Light. So Pro.",
          description:
            "The ultimate iPhone with titanium design, A17 Pro chip, and Pro camera system",
          image:
            "../../../images/iphone 15.avif",
          gradient: "from-slate-600 via-gray-700 to-slate-800",
          cta: "Buy iPhone",
          badge: "Latest Model",
          textColor: "text-white",
        },
        {
          id: 9,
          title: "Sony WH-1000XM5 Headphones",
          subtitle: "Industry Leading Noise Canceling",
          description:
            "Premium wireless headphones with exceptional sound quality and 30-hour battery",
          image:
            "../../../images/Headphones.avif",
          gradient: "from-indigo-600 via-blue-700 to-cyan-600",
          cta: "Shop Audio",
          badge: "Best Seller",
          textColor: "text-white",
        },
      ],
    },
    dark: {
      name: "Dark Mode",
      icon: Moon,
      banners: [
        {
          id: 1,
          title: "Midnight Tech Sale",
          subtitle: "Premium Electronics",
          description: "Exclusive deals on high-end technology and gadgets",
          image:
            "../../../images/Premium Electronics.avif",
          gradient: "from-slate-900 to-slate-700",
          cta: "Shop Now",
          badge: "Exclusive",
          textColor: "text-white",
          overlay: "bg-black/40",
        },
        {
          id: 2,
          title: "Dark Fashion Collection",
          subtitle: "Sophisticated Style",
          description: "Elegant and timeless fashion pieces for every occasion",
          image:
            "../../../images/Dark Fashion Collection.avif",
          gradient: "from-gray-900 to-black",
          cta: "Explore",
          badge: "Premium",
          textColor: "text-white",
          overlay: "bg-black/30",
        },
        {
          id: 3,
          title: "Luxury Watches",
          subtitle: "Timeless Elegance",
          description: "Premium timepieces for the discerning collector",
          image:
            "../../../images/Watches.avif",
          gradient: "from-slate-800 to-gray-900",
          cta: "View Collection",
          badge: "Luxury",
          textColor: "text-white",
          overlay: "bg-black/50",
        },
      ],
    },
    light: {
      name: "Light Mode",
      icon: Sun,
      banners: [
        {
          id: 1,
          title: "Bright Summer Sale",
          subtitle: "Fresh & Clean",
          description: "Light and airy products for a refreshing lifestyle",
          image:
            "../../../images/Bright Summer Sale.avif",
          gradient: "from-white to-gray-100",
          cta: "Shop Light",
          badge: "Summer Special",
          textColor: "text-gray-900",
          overlay: "bg-white/60",
        },
        {
          id: 2,
          title: "Minimalist Home",
          subtitle: "Simple Elegance",
          description: "Clean lines and minimal design for modern living",
          image:
            "../../../images/Minimalist Home.avif",
          gradient: "from-gray-50 to-white",
          cta: "Discover",
          badge: "Trending",
          textColor: "text-gray-900",
          overlay: "bg-gray-100/40",
        },
        {
          id: 3,
          title: "Wellness & Beauty",
          subtitle: "Natural Glow",
          description: "Organic skincare and beauty products for radiant skin",
          image:
            "../../../images/Wellness & Beauty.avif",
          gradient: "from-rose-100 to-pink-50",
          cta: "Shop Beauty",
          badge: "Natural",
          textColor: "text-gray-900",
          overlay: "bg-white/50",
        },
      ],
    },
    vibrant: {
      name: "Vibrant",
      icon: Palette,
      banners: [
        {
          id: 1,
          title: "Color Pop Festival",
          subtitle: "Bold & Beautiful",
          description: "Vibrant products that make a statement",
          image:
            "../../../images/Color Pop Festival.avif",
          gradient: "from-yellow-400 via-red-500 to-pink-500",
          cta: "Get Colorful",
          badge: "Festival Special",
          textColor: "text-white",
          overlay: "bg-gradient-to-t from-black/30 to-transparent",
        },
        {
          id: 2,
          title: "Rainbow Collection",
          subtitle: "Express Yourself",
          description: "Colorful fashion and accessories for every personality",
          image:
            "../../../images/Rainbow Collection.jpg",
          gradient: "from-purple-400 via-pink-500 to-red-500",
          cta: "Shop Colors",
          badge: "Artist Edition",
          textColor: "text-white",
          overlay: "bg-gradient-to-br from-black/20 to-transparent",
        },
        {
          id: 3,
          title: "Neon Nights",
          subtitle: "Glow Up",
          description:
            "Electric fashion and accessories that light up the night",
          image:
            "../../../images/Neon Nights.avif",
          gradient: "from-cyan-400 via-purple-500 to-blue-600",
          cta: "Shop Neon",
          badge: "Night Edition",
          textColor: "text-white",
          overlay: "bg-gradient-to-t from-purple-900/50 to-transparent",
        },
        {
          id: 4,
          title: "Street Art Collection",
          subtitle: "Urban Style",
          description: "Bold designs inspired by street art and urban culture",
          image:
            "../../../images/Street Art Collection.avif",
          gradient: "from-orange-500 via-yellow-400 to-green-500",
          cta: "Explore Street",
          badge: "Limited Drop",
          textColor: "text-white",
          overlay: "bg-gradient-to-br from-black/40 to-transparent",
        },
      ],
    },
  };

  const banners = themes[currentTheme].banners;

  // Auto-theme based on system theme
  useEffect(() => {
    if (theme === "dark") {
      setCurrentTheme("dark");
    } else if (theme === "light") {
      setCurrentTheme("light");
    } else {
      // Auto detect or use gradient as default
      setCurrentTheme("gradient");
    }
  }, [theme]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800">
      {/* Theme Selector */}
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        {Object.entries(themes).map(([themeKey, themeData]) => {
          const Icon = themeData.icon;
          return (
            <Button
              key={themeKey}
              variant={currentTheme === themeKey ? "default" : "outline"}
              size="sm"
              className={`bg-white/20 border-white/30 backdrop-blur-sm ${
                currentTheme === themeKey
                  ? "text-white bg-white/30"
                  : "text-white/70 hover:text-white hover:bg-white/20"
              }`}
              onClick={() => setCurrentTheme(themeKey)}
            >
              <Icon className="h-4 w-4 mr-1" />
              {themeData.name}
            </Button>
          );
        })}
      </div>

      {/* Banner Content */}
      <div className="relative h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
            }`}
          >
            <div
              className={`h-full bg-gradient-to-r ${banner.gradient} relative overflow-hidden`}
            >
              {/* Background Image */}
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 ${banner.overlay || "bg-black/30"}`}
              />

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className={
                    'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')]'
                  }
                ></div>
              </div>

              {/* Content */}
              <div className="container mx-auto px-4 h-full flex items-center relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                  <div className={`${banner.textColor} space-y-6`}>
                    <Badge
                      variant="secondary"
                      className={`w-fit ${
                        banner.textColor === "text-white"
                          ? "bg-white/20 text-white border-white/30"
                          : "bg-gray-900/20 text-gray-900 border-gray-900/30"
                      }`}
                    >
                      {banner.badge}
                    </Badge>

                    <div className="space-y-4">
                      <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                        {banner.title}
                      </h1>
                      <p
                        className={`text-2xl lg:text-3xl font-semibold ${
                          banner.textColor === "text-white"
                            ? "text-white/90"
                            : "text-gray-700"
                        }`}
                      >
                        {banner.subtitle}
                      </p>
                      <p
                        className={`text-lg max-w-md ${
                          banner.textColor === "text-white"
                            ? "text-white/80"
                            : "text-gray-600"
                        }`}
                      >
                        {banner.description}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Button
                        size="lg"
                        className={`text-lg px-8 py-6 ${
                          banner.textColor === "text-white"
                            ? "bg-white text-slate-900 hover:bg-white/90"
                            : "bg-slate-900 text-white hover:bg-slate-800"
                        }`}
                      >
                        {banner.cta}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      <div
                        className={`flex items-center space-x-1 ${
                          banner.textColor === "text-white"
                            ? "text-white/80"
                            : "text-gray-600"
                        }`}
                      >
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">4.8/5 Customer Rating</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative hidden lg:block">
                    <div
                      className={`relative w-full h-80 rounded-2xl backdrop-blur-sm p-8 ${
                        banner.textColor === "text-white"
                          ? "bg-white/10"
                          : "bg-gray-900/10"
                      }`}
                    >
                      <div className="w-full h-full bg-white/20 rounded-xl backdrop-blur-sm flex items-center justify-center">
                        <div className={`text-center ${banner.textColor}`}>
                          <Sparkles className="h-16 w-16 mx-auto mb-4 opacity-60" />
                          <p className="text-lg font-medium opacity-80">
                            {banner.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm z-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm z-10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Dots Indicator with Theme Info */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <div className="flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-110 shadow-lg"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        <div className="text-white/60 text-xs font-medium bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm">
          Theme: {themes[currentTheme].name}
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 bg-white/20">
          <div
            className="h-full bg-gradient-to-r from-white via-yellow-200 to-white transition-all duration-75 ease-linear shadow-lg"
            style={{
              width: `${((currentSlide + 1) / banners.length) * 100}%`,
            }}
          />
        </div>

        {/* Theme indicator strip */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30" />
      </div>
    </div>
  );
};

export default BannerSlider;
