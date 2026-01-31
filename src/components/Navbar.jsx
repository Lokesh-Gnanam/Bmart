import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const cartItems = useSelector((state) => state.cart);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-black">
          HMart
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-gray-600">
            Home
          </Link>

          <Link to="/cart" className="relative hover:text-gray-600">
            Cart
            {/* Cart Count Badge */}
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          <Link
            to="/login"
            className="px-4 py-1 border rounded hover:bg-black hover:text-white transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
