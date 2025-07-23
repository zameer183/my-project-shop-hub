import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, Phone, MapPin, Clock, ShoppingCart, User } from "lucide-react";
import LoginModal from "@/components/auth/LoginModal";
import SignupModal from "@/components/auth/SignupModal";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Admin", href: "/admin" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-background">
      {/* Top Info Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <div className="flex items-center space-x-1">
              <Phone className="h-3 w-3" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>Mon-Sat: 8AM-10PM</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span>123 Health Street, Medical District</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-primary rounded-lg p-2">
                <svg
                  className="h-6 w-6 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">MediCare+</h1>
                <p className="text-xs text-muted-foreground">
                  Your Health Partner
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href)
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                <Badge variant="secondary" className="ml-2">
                  0
                </Badge>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLoginOpen(true)}
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[250px]">
                  <div className="flex flex-col space-y-4 mt-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-sm font-medium transition-colors hover:text-primary ${
                          isActive(item.href)
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="pt-4 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mb-2"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Cart (0)
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-muted mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary rounded-lg p-2">
                  <svg
                    className="h-6 w-6 text-primary-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">MediCare+</h3>
                  <p className="text-xs text-muted-foreground">
                    Your Health Partner
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Providing quality healthcare products and services with trust
                and reliability since 1995.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">
                Contact Info
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>123 Health Street, Medical District</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Mon-Sat: 8AM-10PM</span>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">
                Our Services
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Prescription Medications</li>
                <li>Health Consultations</li>
                <li>Medical Equipment</li>
                <li>Insurance Processing</li>
                <li>Home Delivery</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; 2024 MediCare+. All rights reserved. Licensed Pharmacy
              #12345
            </p>
          </div>
        </div>
      </footer>

      {/* Authentication Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignup={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
      />
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSwitchToLogin={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </div>
  );
};

export default Layout;
