import React, { createContext, useContext, useState, useEffect } from "react";

export interface Address {
  id: number;
  type: "home" | "work" | "other";
  name: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phone?: string;
  isDefault: boolean;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: "customer" | "seller" | "admin";
  addresses: Address[];
  preferences: {
    language: string;
    currency: string;
    newsletter: boolean;
    smsNotifications: boolean;
  };
  sellerProfile?: {
    businessName: string;
    businessType: string;
    taxId: string;
    verified: boolean;
    rating: number;
    totalSales: number;
    responseTime: string;
    description: string;
    logo?: string;
    bankDetails?: {
      accountNumber: string;
      routingNumber: string;
      accountName: string;
    };
  };
  createdAt: string;
  lastLogin?: string;
}

export interface Order {
  id: number;
  userId: number;
  items: {
    productId: number;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
    sellerId: number;
    sellerName: string;
  }[];
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded";
  total: number;
  currency: string;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: {
    type: "card" | "paypal" | "bank" | "cod";
    last4?: string;
    brand?: string;
  };
  tracking?: {
    number: string;
    carrier: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

interface UserContextType {
  // Authentication
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User>, password: string) => Promise<boolean>;
  logout: () => void;

  // Profile management
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  updateSellerProfile: (
    updates: Partial<User["sellerProfile"]>,
  ) => Promise<boolean>;

  // Address management
  addAddress: (address: Omit<Address, "id">) => Promise<boolean>;
  updateAddress: (id: number, updates: Partial<Address>) => Promise<boolean>;
  deleteAddress: (id: number) => Promise<boolean>;
  setDefaultAddress: (id: number) => Promise<boolean>;

  // Orders
  orders: Order[];
  getOrders: () => Promise<Order[]>;
  getOrder: (id: number) => Order | undefined;
  createOrder: (
    orderData: Omit<Order, "id" | "createdAt" | "updatedAt">,
  ) => Promise<Order | null>;
  cancelOrder: (id: number) => Promise<boolean>;

  // Loading states
  loading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock user data
const mockUser: User = {
  id: 1,
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  phone: "+1234567890",
  avatar: "/placeholder.svg",
  role: "customer",
  addresses: [
    {
      id: 1,
      type: "home",
      name: "John Doe",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      country: "United States",
      zipCode: "10001",
      phone: "+1234567890",
      isDefault: true,
    },
    {
      id: 2,
      type: "work",
      name: "John Doe",
      street: "456 Business Ave",
      city: "New York",
      state: "NY",
      country: "United States",
      zipCode: "10002",
      phone: "+1234567890",
      isDefault: false,
    },
  ],
  preferences: {
    language: "en",
    currency: "USD",
    newsletter: true,
    smsNotifications: false,
  },
  createdAt: "2024-01-01T00:00:00Z",
  lastLogin: "2024-01-20T10:30:00Z",
};

// Mock orders data
const mockOrders: Order[] = [
  {
    id: 1001,
    userId: 1,
    items: [
      {
        productId: 1,
        productName: "iPhone 15 Pro Max",
        productImage: "/placeholder.svg",
        quantity: 1,
        price: 1199,
        sellerId: 1,
        sellerName: "TechWorld Store",
      },
    ],
    status: "delivered",
    total: 1199,
    currency: "USD",
    shippingAddress: mockUser.addresses[0],
    billingAddress: mockUser.addresses[0],
    paymentMethod: {
      type: "card",
      last4: "4242",
      brand: "visa",
    },
    tracking: {
      number: "1Z999AA1234567890",
      carrier: "UPS",
      url: "https://ups.com/track",
    },
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-18T15:30:00Z",
  },
  {
    id: 1002,
    userId: 1,
    items: [
      {
        productId: 4,
        productName: "Sony WH-1000XM5 Headphones",
        productImage: "/placeholder.svg",
        quantity: 1,
        price: 349,
        sellerId: 3,
        sellerName: "Audio Excellence",
      },
    ],
    status: "shipped",
    total: 349,
    currency: "USD",
    shippingAddress: mockUser.addresses[0],
    billingAddress: mockUser.addresses[0],
    paymentMethod: {
      type: "paypal",
    },
    tracking: {
      number: "1Z999AA9876543210",
      carrier: "FedEx",
      url: "https://fedex.com/track",
    },
    createdAt: "2024-01-18T14:00:00Z",
    updatedAt: "2024-01-19T09:15:00Z",
    estimatedDelivery: "2024-01-22T18:00:00Z",
  },
];

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Authentication functions
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, accept any email/password
      if (email && password) {
        const loginUser = { ...mockUser, email };
        setUser(loginUser);
        setOrders(mockOrders);
        return true;
      }

      setError("Invalid credentials");
      return false;
    } catch (err) {
      setError("Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    userData: Partial<User>,
    password: string,
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser: User = {
        id: Math.floor(Math.random() * 10000),
        email: userData.email || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        phone: userData.phone,
        role: userData.role || "customer",
        addresses: [],
        preferences: {
          language: "en",
          currency: "USD",
          newsletter: true,
          smsNotifications: false,
        },
        createdAt: new Date().toISOString(),
      };

      setUser(newUser);
      return true;
    } catch (err) {
      setError("Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    localStorage.removeItem("user");
  };

  // Profile management
  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (user) {
        setUser({ ...user, ...updates });
        return true;
      }
      return false;
    } catch (err) {
      setError("Failed to update profile");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateSellerProfile = async (
    updates: Partial<User["sellerProfile"]>,
  ): Promise<boolean> => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (user) {
        setUser({
          ...user,
          sellerProfile: {
            ...user.sellerProfile,
            ...updates,
          } as User["sellerProfile"],
        });
        return true;
      }
      return false;
    } catch (err) {
      setError("Failed to update seller profile");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Address management
  const addAddress = async (address: Omit<Address, "id">): Promise<boolean> => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (user) {
        const newAddress: Address = {
          ...address,
          id: Math.floor(Math.random() * 10000),
        };

        setUser({
          ...user,
          addresses: [...user.addresses, newAddress],
        });
        return true;
      }
      return false;
    } catch (err) {
      setError("Failed to add address");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = async (
    id: number,
    updates: Partial<Address>,
  ): Promise<boolean> => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (user) {
        const updatedAddresses = user.addresses.map((addr) =>
          addr.id === id ? { ...addr, ...updates } : addr,
        );

        setUser({ ...user, addresses: updatedAddresses });
        return true;
      }
      return false;
    } catch (err) {
      setError("Failed to update address");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (id: number): Promise<boolean> => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (user) {
        const filteredAddresses = user.addresses.filter(
          (addr) => addr.id !== id,
        );
        setUser({ ...user, addresses: filteredAddresses });
        return true;
      }
      return false;
    } catch (err) {
      setError("Failed to delete address");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const setDefaultAddress = async (id: number): Promise<boolean> => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (user) {
        const updatedAddresses = user.addresses.map((addr) => ({
          ...addr,
          isDefault: addr.id === id,
        }));

        setUser({ ...user, addresses: updatedAddresses });
        return true;
      }
      return false;
    } catch (err) {
      setError("Failed to set default address");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Order management
  const getOrders = async (): Promise<Order[]> => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (user) {
        setOrders(mockOrders);
        return mockOrders;
      }
      return [];
    } catch (err) {
      setError("Failed to fetch orders");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getOrder = (id: number): Order | undefined => {
    return orders.find((order) => order.id === id);
  };

  const createOrder = async (
    orderData: Omit<Order, "id" | "createdAt" | "updatedAt">,
  ): Promise<Order | null> => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newOrder: Order = {
        ...orderData,
        id: Math.floor(Math.random() * 100000),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setOrders((prev) => [newOrder, ...prev]);
      return newOrder;
    } catch (err) {
      setError("Failed to create order");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (id: number): Promise<boolean> => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedOrders = orders.map((order) =>
        order.id === id ? { ...order, status: "cancelled" as const } : order,
      );

      setOrders(updatedOrders);
      return true;
    } catch (err) {
      setError("Failed to cancel order");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value: UserContextType = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    updateSellerProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    orders,
    getOrders,
    getOrder,
    createOrder,
    cancelOrder,
    loading,
    error,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
