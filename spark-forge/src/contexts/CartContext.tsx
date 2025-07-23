import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  category: string;
}

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
}

interface CartContextType {
  // Cart
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Wishlist
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  wishlistCount: number;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: any[];

  // UI State
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("shopmart-cart");
    const savedWishlist = localStorage.getItem("shopmart-wishlist");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("shopmart-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("shopmart-wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Cart functions
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Wishlist functions
  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems((prev) => {
      const exists = prev.find((wishItem) => wishItem.id === item.id);
      if (exists) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: number) => {
    return wishlistItems.some((item) => item.id === id);
  };

  // Calculated values
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  // Mock search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      // Mock search results - in real app, this would be an API call
      const mockResults = [
        {
          id: 1,
          name: "iPhone 15 Pro Max",
          price: 999,
          category: "Electronics",
        },
        {
          id: 2,
          name: "Samsung Galaxy S24",
          price: 699,
          category: "Electronics",
        },
        { id: 3, name: "MacBook Air M3", price: 1099, category: "Electronics" },
      ].filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setSearchResults(mockResults);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount,
        searchQuery,
        setSearchQuery,
        searchResults,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
