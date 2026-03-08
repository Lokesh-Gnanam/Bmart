import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const cartItems = useSelector((state) => state.cart);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="bg-white sticky top-0 z-50 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1 border-b-2 border-green-500 pb-1">
            <span className="text-3xl font-extrabold text-red-600 tracking-tight">BMart</span>
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex flex-1 justify-center space-x-8 text-sm font-medium text-gray-600">
            <Link to="/category" className="hover:text-gray-900 transition-colors">Category</Link>
            <Link to="/deals" className="hover:text-gray-900 transition-colors">Deals</Link>
            <Link to="/whats-new" className="hover:text-gray-900 transition-colors">What's new</Link>
            <Link to="/delivery" className="hover:text-gray-900 transition-colors">Delivery</Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search Product"
                className="w-64 lg:w-80 pl-4 pr-10 py-1.5 rounded-full bg-transparent border border-gray-300 text-sm focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-2.5">
                <Search className="h-4 w-4 text-gray-500" />
              </button>
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6 ml-6">
            {/* Cart */}
            <Link to="/cart" className="relative flex items-center text-gray-700 hover:text-gray-900 transition-colors group">
              <ShoppingCart className="h-5 w-5 mr-1.5 text-gray-600 group-hover:text-gray-900" />
              <span className="text-sm font-medium">Cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* User */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-gray-900 transition-colors">
                  <User className="h-5 w-5 mr-1.5 text-gray-600 group-hover:text-gray-900" />
                  <span className="text-sm font-medium">Account</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-sm font-medium truncate text-gray-800">{user.email}</p>
                  </div>
                  <button 
                    onClick={() => navigate("/login")}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex items-center text-gray-700 hover:text-gray-900 transition-colors group">
                <User className="h-5 w-5 mr-1.5 text-gray-600 group-hover:text-gray-900" />
                <span className="text-sm font-medium">Account</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-1 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-100">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Product"
                  className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 text-sm focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-3 top-2.5">
                  <Search className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </form>
            <div className="space-y-2 text-sm font-medium text-gray-700 px-2">
              <Link to="/category" className="block py-2">Category</Link>
              <Link to="/deals" className="block py-2">Deals</Link>
              <Link to="/whats-new" className="block py-2">What's new</Link>
              <Link to="/delivery" className="block py-2">Delivery</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;