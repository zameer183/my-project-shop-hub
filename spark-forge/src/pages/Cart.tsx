import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import GlobalHeader from "@/components/ecommerce/GlobalHeader";
import { useCart } from "@/contexts/CartContext";
import { useGlobal, formatPrice } from "@/contexts/GlobalContext";
import {
  Minus,
  Plus,
  X,
  ShoppingBag,
  Truck,
  Shield,
  CreditCard,
  ArrowLeft,
  Heart,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    addToWishlist,
  } = useCart();
  const { currency, t } = useGlobal();
  const [promoCode, setPromoCode] = useState("");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const moveToWishlist = (item: any) => {
    addToWishlist({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      rating: 4.5,
      reviews: 100,
      seller: item.seller,
    });
    removeFromCart(item.id);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet
            </p>
            <Button asChild>
              <Link to="/shopping">Continue Shopping</Link>
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
            <span className="text-foreground">Shopping Cart</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    Shopping Cart ({cartItems.length} items)
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={clearCart}>
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.seller}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="font-bold">
                            {formatPrice(item.price, currency)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(item.originalPrice, currency)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveToWishlist(item)}
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal, currency)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : formatPrice(shipping, currency)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(tax, currency)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total, currency)}</span>
                </div>

                {/* Promo Code */}
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>

                <Separator />

                {/* Checkout Button */}
                <Button className="w-full" size="lg" asChild>
                  <Link to="/checkout">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Checkout
                  </Link>
                </Button>

                {/* Continue Shopping */}
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/shopping">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>

                {/* Security Features */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Secure 256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <span>Free shipping on orders over $50</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
