import React, { createContext, useContext, useState, useEffect } from "react";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  category: string;
  subcategory?: string;
  brand: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  stockCount: number;
  seller: {
    id: number;
    name: string;
    rating: number;
    responseTime: string;
    location: string;
    verified: boolean;
  };
  specifications: Record<string, string>;
  tags: string[];
  discount?: number;
  isFlashSale?: boolean;
  flashSaleEndTime?: string;
  shippingInfo: {
    freeShipping: boolean;
    estimatedDays: string;
    cost?: number;
  };
  variants?: {
    color?: string[];
    size?: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilter {
  category?: string;
  priceRange?: [number, number];
  rating?: number;
  brand?: string[];
  inStock?: boolean;
  freeShipping?: boolean;
  onSale?: boolean;
}

export interface ProductSort {
  field: "price" | "rating" | "name" | "createdAt";
  direction: "asc" | "desc";
}

interface ProductContextType {
  // Products
  products: Product[];
  setProducts: (products: Product[]) => void;

  // Featured products
  featuredProducts: Product[];
  flashSaleProducts: Product[];
  recommendedProducts: Product[];

  // Search and filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: ProductFilter;
  setFilters: (filters: ProductFilter) => void;
  sort: ProductSort;
  setSort: (sort: ProductSort) => void;

  // Categories
  categories: string[];

  // Product operations
  getProduct: (id: number) => Product | undefined;
  searchProducts: (query: string, filters?: ProductFilter) => Product[];
  getProductsByCategory: (category: string) => Product[];

  // Loading states
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    description:
      "The most advanced iPhone with titanium design and A17 Pro chip.",
    price: 1199,
    originalPrice: 1299,
    currency: "USD",
    images: ["../images/iphone 15.avif", "../images/iphone 15 2.jpeg", "../images/iphone 15 3.jpeg"],
    category: "Electronics",
    subcategory: "Smartphones",
    brand: "Apple",
    rating: 4.8,
    reviews: 1247,
    inStock: true,
    stockCount: 50,
    seller: {
      id: 1,
      name: "TechWorld Store",
      rating: 4.9,
      responseTime: "within 2 hours",
      location: "United States",
      verified: true,
    },
    specifications: {
      Display: "6.7-inch Super Retina XDR",
      Chip: "A17 Pro",
      Camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
      Storage: "256GB",
      Battery: "Up to 29 hours video playback",
    },
    tags: ["smartphone", "apple", "ios", "premium"],
    discount: 8,
    isFlashSale: true,
    flashSaleEndTime: "2024-12-31T23:59:59Z",
    shippingInfo: {
      freeShipping: true,
      estimatedDays: "2-3 days",
    },
    variants: {
      color: [
        "Natural Titanium",
        "Blue Titanium",
        "White Titanium",
        "Black Titanium",
      ],
      size: ["256GB", "512GB", "1TB"],
    },
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T15:30:00Z",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    description: "Next-generation Galaxy with AI-powered features and S Pen.",
    price: 1199,
    originalPrice: 1299,
    currency: "USD",
    images: ["../images/Samsung1.jpeg", "../images/Samsung2.jpeg", "../images/Samsung3.jpeg"],
    category: "Electronics",
    subcategory: "Smartphones",
    brand: "Samsung",
    rating: 4.7,
    reviews: 892,
    inStock: true,
    stockCount: 30,
    seller: {
      id: 2,
      name: "Samsung Official Store",
      rating: 4.8,
      responseTime: "within 1 hour",
      location: "South Korea",
      verified: true,
    },
    specifications: {
      Display: "6.8-inch Dynamic AMOLED 2X",
      Processor: "Snapdragon 8 Gen 3",
      Camera: "200MP Main + 12MP Ultra Wide + 10MP Telephoto + 10MP Periscope",
      Storage: "256GB",
      Battery: "5000mAh",
    },
    tags: ["smartphone", "samsung", "android", "s-pen"],
    discount: 8,
    isFlashSale: true,

    shippingInfo: {
      freeShipping: true,
      estimatedDays: "3-5 days",
    },
    variants: {
      color: [
        "Titanium Gray",
        "Titanium Black",
        "Titanium Violet",
        "Titanium Yellow",
      ],
      size: ["256GB", "512GB", "1TB"],
    },
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-18T15:30:00Z",
  },
  {
    id: 3,
    name: "MacBook Air M3",
    description: "Supercharged by the M3 chip. Ultra-portable and powerful.",
    price: 1299,
    originalPrice: 1399,
    currency: "USD",
    images: ["../images/MacBook Air M3 1.jpeg", "../images/MacBook Air M3 2.jpeg", "../images/MacBook Air M3 3.jpeg"],
    category: "Electronics",
    subcategory: "Laptops",
    brand: "Apple",
    rating: 4.9,
    reviews: 567,
    inStock: true,
    stockCount: 25,
    seller: {
      id: 1,
      name: "TechWorld Store",
      rating: 4.9,
      responseTime: "within 2 hours",
      location: "United States",
      verified: true,
    },
    specifications: {
      Display: "13.6-inch Liquid Retina",
      Chip: "Apple M3",
      Memory: "8GB unified memory",
      Storage: "256GB SSD",
      Battery: "Up to 18 hours",
    },
    tags: ["laptop", "apple", "macbook", "m3"],
    discount: 7,
    isFlashSale: true,

    shippingInfo: {
      freeShipping: true,
      estimatedDays: "2-4 days",
    },
    variants: {
      color: ["Midnight", "Starlight", "Space Gray", "Silver"],
      size: ["256GB", "512GB", "1TB", "2TB"],
    },
    createdAt: "2024-01-12T10:00:00Z",
    updatedAt: "2024-01-19T15:30:00Z",
  },
  {
    id: 4,
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise canceling with premium audio quality.",
    price: 349,
    originalPrice: 399,
    currency: "USD",
    images: ["../images/Sony WH-1000XM5 Headphones 1.jpeg", "../images/Sony WH-1000XM5 Headphones 2.jpeg", "../images/Sony WH-1000XM5 Headphones 3.jpeg"],
    category: "Electronics",
    subcategory: "Audio",
    brand: "Sony",
    rating: 4.6,
    reviews: 324,
    inStock: true,
    stockCount: 75,
    seller: {
      id: 3,
      name: "Audio Excellence",
      rating: 4.7,
      responseTime: "within 3 hours",
      location: "Japan",
      verified: true,
    },
    specifications: {
      Type: "Over-ear, Wireless",
      Driver: "30mm",
      "Frequency Response": "4Hz-40kHz",
      "Battery Life": "Up to 30 hours",
      Connectivity: "Bluetooth 5.2, USB-C",
    },
    tags: ["headphones", "wireless", "noise-canceling", "sony"],
    discount: 13,
    isFlashSale: true,
    flashSaleEndTime: "2024-12-31T23:59:59Z",
    shippingInfo: {
      freeShipping: true,
      estimatedDays: "5-7 days",
    },
    variants: {
      color: ["Black", "Silver"],
    },
    createdAt: "2024-01-08T10:00:00Z",
    updatedAt: "2024-01-16T15:30:00Z",
  },
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<ProductFilter>({});
  const [sort, setSort] = useState<ProductSort>({
    field: "createdAt",
    direction: "desc",
  });
  const [loading, setLoading] = useState(false);

  // Derived state
  const categories = Array.from(new Set(products.map((p) => p.category)));

  const featuredProducts = products.filter((p) => p.rating >= 4.7).slice(0, 8);

  const flashSaleProducts = products.filter((p) => p.isFlashSale);

  const recommendedProducts = products
    .filter((p) => p.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 12);

  // Product operations
  const getProduct = (id: number): Product | undefined => {
    return products.find((p) => p.id === id);
  };

  const searchProducts = (
    query: string,
    productFilters?: ProductFilter,
  ): Product[] => {
    let filtered = products;

    // Apply search query
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(lowercaseQuery) ||
          p.description.toLowerCase().includes(lowercaseQuery) ||
          p.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
          p.brand.toLowerCase().includes(lowercaseQuery),
      );
    }

    // Apply filters
    const appliedFilters = productFilters || filters;

    if (appliedFilters.category) {
      filtered = filtered.filter((p) => p.category === appliedFilters.category);
    }

    if (appliedFilters.priceRange) {
      const [min, max] = appliedFilters.priceRange;
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    }

    if (appliedFilters.rating) {
      filtered = filtered.filter((p) => p.rating >= appliedFilters.rating!);
    }

    if (appliedFilters.brand && appliedFilters.brand.length > 0) {
      filtered = filtered.filter((p) =>
        appliedFilters.brand!.includes(p.brand),
      );
    }

    if (appliedFilters.inStock) {
      filtered = filtered.filter((p) => p.inStock);
    }

    if (appliedFilters.freeShipping) {
      filtered = filtered.filter((p) => p.shippingInfo.freeShipping);
    }

    if (appliedFilters.onSale) {
      filtered = filtered.filter((p) => p.discount && p.discount > 0);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sort.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sort.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return filtered;
  };

  const getProductsByCategory = (category: string): Product[] => {
    return products.filter((p) => p.category === category);
  };

  const value: ProductContextType = {
    products,
    setProducts,
    featuredProducts,
    flashSaleProducts,
    recommendedProducts,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sort,
    setSort,
    categories,
    getProduct,
    searchProducts,
    getProductsByCategory,
    loading,
    setLoading,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
