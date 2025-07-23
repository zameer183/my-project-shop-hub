import React, { createContext, useContext, useState, useEffect } from "react";

interface GlobalContextType {
  // Language
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;

  // Currency
  currency: string;
  setCurrency: (curr: string) => void;

  // Location
  location: string;
  setLocation: (loc: string) => void;

  // Theme
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<string, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.categories": "Categories",
    "nav.deals": "Deals",
    "nav.account": "Account",
    "nav.cart": "Cart",
    "nav.wishlist": "Wishlist",
    "nav.search": "Search products...",
    "hero.title": "Global Shopping Made Easy",
    "hero.subtitle": "Discover millions of products from sellers worldwide",
    "flash.sale": "Flash Sale",
    "flash.ends": "Ends in",
    "categories.title": "Shop by Category",
    "categories.subtitle":
      "Discover millions of products across all categories",
    "product.add.cart": "Add to Cart",
    "product.buy.now": "Buy Now",
    "product.rating": "Rating",
    "product.reviews": "Reviews",
    "footer.about": "About Us",
    "footer.contact": "Contact",
    "footer.help": "Help Center",
    "footer.returns": "Returns",
    "seller.dashboard": "Seller Dashboard",
    "admin.panel": "Admin Panel",
    "currency.usd": "USD ($)",
    "currency.eur": "EUR (€)",
    "currency.gbp": "GBP (£)",
    "currency.pkr": "PKR (₨)",
    "currency.aed": "AED (د.إ)",
  },
  es: {
    "nav.home": "Inicio",
    "nav.products": "Productos",
    "nav.categories": "Categorías",
    "nav.deals": "Ofertas",
    "nav.account": "Cuenta",
    "nav.cart": "Carrito",
    "nav.wishlist": "Lista de deseos",
    "nav.search": "Buscar productos...",
    "hero.title": "Compras Globales Fáciles",
    "hero.subtitle":
      "Descubre millones de productos de vendedores de todo el mundo",
    "flash.sale": "Oferta Relámpago",
    "flash.ends": "Termina en",
    "categories.title": "Comprar por Categoría",
    "categories.subtitle":
      "Descubre millones de productos en todas las categorías",
    "product.add.cart": "Añadir al Carrito",
    "product.buy.now": "Comprar Ahora",
    "product.rating": "Calificación",
    "product.reviews": "Reseñas",
    "footer.about": "Acerca de",
    "footer.contact": "Contacto",
    "footer.help": "Centro de Ayuda",
    "footer.returns": "Devoluciones",
    "seller.dashboard": "Panel del Vendedor",
    "admin.panel": "Panel de Administración",
    "currency.usd": "USD ($)",
    "currency.eur": "EUR (€)",
    "currency.gbp": "GBP (£)",
    "currency.pkr": "PKR (₨)",
    "currency.aed": "AED (د.إ)",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.products": "Produits",
    "nav.categories": "Catégories",
    "nav.deals": "Offres",
    "nav.account": "Compte",
    "nav.cart": "Panier",
    "nav.wishlist": "Liste de souhaits",
    "nav.search": "Rechercher des produits...",
    "hero.title": "Shopping Global Facile",
    "hero.subtitle":
      "Découvrez des millions de produits de vendeurs du monde entier",
    "flash.sale": "Vente Flash",
    "flash.ends": "Se termine dans",
    "categories.title": "Acheter par Catégorie",
    "categories.subtitle":
      "Découvrez des millions de produits dans toutes les catégories",
    "product.add.cart": "Ajouter au Panier",
    "product.buy.now": "Acheter Maintenant",
    "product.rating": "Notation",
    "product.reviews": "Avis",
    "footer.about": "À propos",
    "footer.contact": "Contact",
    "footer.help": "Centre d'aide",
    "footer.returns": "Retours",
    "seller.dashboard": "Tableau de bord Vendeur",
    "admin.panel": "Panneau d'administration",
    "currency.usd": "USD ($)",
    "currency.eur": "EUR (€)",
    "currency.gbp": "GBP (£)",
    "currency.pkr": "PKR (₨)",
    "currency.aed": "AED (د.إ)",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.products": "المنتجات",
    "nav.categories": "الفئات",
    "nav.deals": "العروض",
    "nav.account": "الحساب",
    "nav.cart": "السلة",
    "nav.wishlist": "قائمة الأمنيات",
    "nav.search": "البحث عن المنتجات...",
    "hero.title": "التسوق العالمي أصبح سهلاً",
    "hero.subtitle": "اكتشف ملايين المنتجات من البائعين حول العالم",
    "flash.sale": "تخفيضات سريعة",
    "flash.ends": "تنتهي في",
    "categories.title": "تسوق حسب الفئة",
    "categories.subtitle": "اكتشف ملايين المنتجات في جميع الفئات",
    "product.add.cart": "أضف إلى السلة",
    "product.buy.now": "اشتري الآن",
    "product.rating": "التقييم",
    "product.reviews": "التقييمات",
    "footer.about": "معلومات عنا",
    "footer.contact": "اتصل بنا",
    "footer.help": "مركز المساعدة",
    "footer.returns": "المرتجعات",
    "seller.dashboard": "لوحة البائع",
    "admin.panel": "لوحة الإدارة",
    "currency.usd": "USD ($)",
    "currency.eur": "EUR (€)",
    "currency.gbp": "GBP (£)",
    "currency.pkr": "PKR (₨)",
    "currency.aed": "AED (د.إ)",
  },
};

// Currency conversion rates (in a real app, these would come from an API)
const currencyRates: Record<string, number> = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  PKR: 280,
  AED: 3.67,
};

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("preferred-language") || "en";
  });

  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("preferred-currency") || "USD";
  });

  const [location, setLocation] = useState(() => {
    return localStorage.getItem("user-location") || "United States";
  });

  const [theme, setTheme] = useState<"light" | "dark" | "system">(() => {
    return (
      (localStorage.getItem("theme") as "light" | "dark" | "system") || "system"
    );
  });

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem("preferred-language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("preferred-currency", currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem("user-location", location);
  }, [location]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Apply theme
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Translation function
  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  const value: GlobalContextType = {
    language,
    setLanguage,
    t,
    currency,
    setCurrency,
    location,
    setLocation,
    theme,
    setTheme,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};

// Utility function to convert prices
export const convertPrice = (
  price: number,
  fromCurrency: string,
  toCurrency: string,
): number => {
  const usdPrice = price / currencyRates[fromCurrency];
  return Math.round(usdPrice * currencyRates[toCurrency] * 100) / 100;
};

// Utility function to format price with currency symbol
export const formatPrice = (price: number, currency: string): string => {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    PKR: "₨",
    AED: "د.إ",
  };

  const symbol = symbols[currency] || currency;

  if (currency === "AED") {
    return `${price} ${symbol}`;
  }

  return `${symbol}${price.toLocaleString()}`;
};
