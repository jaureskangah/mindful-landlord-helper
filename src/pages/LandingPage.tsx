import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Shield, Users, Wrench, DollarSign, LogIn, List, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import AuthModal from "@/components/auth/AuthModal";

const LandingPage = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Name */}
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-red-600" />
              <span className="text-xl font-bold text-red-600">PropManager</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-1 text-slate-600 hover:text-red-600 transition-colors">
                <List className="h-4 w-4" />
                <span>Features</span>
              </div>
              <div className="flex items-center gap-1 text-slate-600 hover:text-red-600 transition-colors">
                <DollarSign className="h-4 w-4" />
                <span>Pricing</span>
              </div>
              <div className="flex items-center gap-1 text-slate-600 hover:text-red-600 transition-colors">
                <Gift className="h-4 w-4" />
                <span>Free Trial</span>
              </div>
              {user ? (
                <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
                  <Link to="/dashboard">
                    Dashboard
                  </Link>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setShowAuthModal(true)}
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              )}
            </nav>

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <List className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Add margin-top to account for fixed header */}
      <div className="pt-16">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-700 to-red-500 bg-clip-text text-transparent animate-fade-in">
              Simplify Your Property Management
            </h1>
            <p className="text-slate-600 text-xl md:text-2xl max-w-3xl mx-auto animate-fade-in delay-100">
              A complete solution to manage your properties, tenants, and maintenance with ease.
            </p>
            <div className="flex justify-center gap-4 animate-fade-in delay-200">
              <Button asChild size="lg" className="group bg-red-600 hover:bg-red-700">
                <Link to="/properties">
                  Get Started Now
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Powerful tools for efficient management of your real estate portfolio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/80 backdrop-blur-lg p-6 rounded-xl border border-red-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Property Management</h3>
              <p className="text-slate-600">
                Track your properties and their performance in real-time
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg p-6 rounded-xl border border-red-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Tenant Management</h3>
              <p className="text-slate-600">
                Easily manage your tenants and their documents
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg p-6 rounded-xl border border-red-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Wrench className="text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Maintenance</h3>
              <p className="text-slate-600">
                Track and manage maintenance requests
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg p-6 rounded-xl border border-red-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Security</h3>
              <p className="text-slate-600">
                Your data is secure and protected
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Simplify Your Management?
            </h2>
            <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of property owners who trust our solution
            </p>
            <Button asChild size="lg" variant="secondary" className="group">
              <Link to="/signup">
                Try For Free
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default LandingPage;
