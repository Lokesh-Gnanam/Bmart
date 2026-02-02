import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { ShoppingBag, Star } from "lucide-react";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-4 card-hover border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Product Image */}
      <div className="relative h-48 mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
        <img 
          src={product.image || `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop`}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            -{product.discount}%
          </div>
        )}
        <button className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Star className="h-4 w-4" />
        </button>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-medium text-gray-800 dark:text-gray-200 line-clamp-1">
          {product.name}
        </h3>
        
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-sm text-gray-500">({product.rating || 4.5})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              ₹{product.price.toLocaleString()}
            </p>
            {product.originalPrice && (
              <p className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </p>
            )}
          </div>

          <button
            onClick={() => dispatch(addToCart(product))}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-110"
            aria-label="Add to cart"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>

        {product.freeDelivery && (
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">
            ✓ Free Delivery
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductCard;