import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity, removeFromCart } from "../redux/cartSlice";
import { Star, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItem = useSelector(state => state.cart.find(item => item.id === product.id));

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleUpdateQuantity = (e, newQuantity) => {
    e.stopPropagation();
    if (newQuantity < 1) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
    }
  };

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col group p-3 cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg mb-4 bg-gray-50 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow px-1">
        <h3 className="font-bold text-gray-900 text-[15px] mb-1 truncate">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-2 truncate">{product.subtitle}</p>
        
        {/* Rating Stars */}
        <div className="flex items-center space-x-0.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-green-500 text-green-500' : 'fill-gray-200 text-gray-200'}`} />
          ))}
        </div>

        {/* Add to Cart Button */}
        <div className="mt-auto">
          {cartItem ? (
            <div className="flex items-center justify-between w-full sm:w-auto px-1 py-1 bg-green-50 rounded-full border border-green-200">
              <button
                onClick={(e) => handleUpdateQuantity(e, cartItem.quantity - 1)}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-green-700 font-bold shadow-sm hover:bg-green-100"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-green-800 px-2">{cartItem.quantity}</span>
              <button
                onClick={(e) => handleUpdateQuantity(e, cartItem.quantity + 1)}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-green-700 font-bold shadow-sm hover:bg-green-100"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto px-5 py-2 bg-[#00d632] hover:bg-[#00c02d] text-white text-sm font-bold rounded-full transition-colors active:scale-95"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;