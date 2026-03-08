import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111827] text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-blue-600">
                Bmart
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              Premium shopping experience with quality products and fast delivery.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Facebook className="h-4 w-4 text-gray-400" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Twitter className="h-4 w-4 text-gray-400" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Linkedin className="h-4 w-4 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-[15px]">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link to="/deals" className="hover:text-white transition-colors">Today's Deals</Link></li>
              <li><Link to="/new" className="hover:text-white transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-[15px]">Help & Support</h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-[15px]">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
                <span>123 Business Street, City, Country</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-600" />
                <span>support@bmart.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {currentYear} Bmart. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <div className="flex items-center space-x-1 border-r border-gray-800 pr-6">
              <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
              <span>Made with love</span>
            </div>
            <div>
              Developed by Lokesh
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;