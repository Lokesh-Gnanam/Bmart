import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Star } from "lucide-react";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col group p-3">
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
          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto px-5 py-2 bg-[#00d632] hover:bg-[#00c02d] text-white text-sm font-bold rounded-full transition-colors active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;