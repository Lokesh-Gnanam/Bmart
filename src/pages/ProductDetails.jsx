import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../redux/cartSlice";
import { Star, Heart, Share2, Plus, Minus } from "lucide-react";
import ProductCard from "../components/ProductCard";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const product = products.find(p => p.id === parseInt(id)) || products[0];
  const cartItem = useSelector(state => state.cart.find(item => item.id === product.id));
  
  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [isLiked, setIsLiked] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [showReturnPolicy, setShowReturnPolicy] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity < 1) {
      dispatch(updateQuantity({ id: product.id, quantity: 0 })); // Update logic or use remove if needed, assuming updateQuantity handles 0 or Redux has remove
    } else {
      dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
    }
  };

  const handleBuyNow = () => {
    navigate('/payment');
  };

  const handlePostalCodeCheck = () => {
    if (postalCode === "606702" || postalCode === "606705") {
      setShowReturnPolicy(true);
    } else {
      setShowReturnPolicy(false);
    }
  };

  const handleColorChange = (color, index) => {
    setSelectedColor(color);
    if (product.images && product.images[index]) {
      setSelectedImage(product.images[index]);
    }
  };

  const similarProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8">
        <span className="cursor-pointer hover:text-green-600" onClick={() => navigate('/')}>Home</span> / 
        <span className="cursor-pointer hover:text-green-600 ml-1" onClick={() => navigate('/category')}>Category</span> / 
        <span className="text-gray-900 ml-1 font-medium">{product.name}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-12 bg-white rounded-3xl p-6 lg:p-10 mb-12 shadow-sm border border-gray-50">
        
        {/* Images Section */}
        <div className="w-full md:w-1/2">
          <div className="bg-gray-50 rounded-2xl flex items-center justify-center p-8 mb-4 h-[400px]">
             <img src={selectedImage} alt={product.name} className="max-h-full object-contain mix-blend-multiply" />
          </div>
          {product.images && product.images.length > 0 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl bg-gray-50 border-2 flex items-center justify-center cursor-pointer p-2 flex-shrink-0 ${selectedImage === img ? 'border-green-500' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="max-h-full object-contain mix-blend-multiply" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-4">{product.subtitle}</p>
          
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-green-500 text-green-500' : 'fill-gray-200 text-gray-200'}`} />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>

          <div className="mb-6">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              ${product.price.toFixed(2)} {product.originalPrice && <span className="text-xl text-gray-400 line-through ml-2 font-medium">${product.originalPrice.toFixed(2)}</span>}
            </div>
            <p className="text-sm text-gray-500">Suggested payments with 6 months special financing</p>
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-3">Choose a Color</h3>
              <div className="flex gap-3">
                {product.colors.map((color, idx) => (
                  <div 
                    key={idx}
                    onClick={() => handleColorChange(color, idx)}
                    className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center ${selectedColor === color ? 'ring-2 ring-offset-2 ring-gray-900' : 'ring-1 ring-gray-200'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {cartItem ? (
              <div className="bg-green-50 rounded-full flex items-center justify-between px-4 py-2 w-full sm:w-32 border border-green-200">
                <button 
                  onClick={() => handleUpdateQuantity(cartItem.quantity - 1)}
                  className="text-green-700 hover:text-green-900 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-green-900">{cartItem.quantity}</span>
                <button 
                  onClick={() => handleUpdateQuantity(cartItem.quantity + 1)}
                  className="text-green-700 hover:text-green-900 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ) : (
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 font-bold rounded-full py-3 transition-colors border-2 border-gray-300 text-gray-900 hover:border-gray-900"
                >
                  Add to Cart
                </button>
            )}
            
            <div className="flex-1 flex gap-3">
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-[#004d40] hover:bg-[#003d33] text-white font-bold rounded-full py-3 transition-colors"
              >
                Buy Now
              </button>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setIsLiked(!isLiked)} 
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                title={isLiked ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-4">
               <div className="flex items-start gap-4">
                 <div className="mt-1"><span className="text-orange-500 font-bold px-2 py-0.5 rounded border border-orange-200 bg-orange-50 text-xs">FREE</span></div>
                 <div className="flex-1">
                    <h4 className="font-bold text-gray-900">Free Delivery</h4>
                    <p className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">Enter your Postal code for Delivery Availability</p>
                    <div className="mt-3 flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Postal Code" 
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm w-32 focus:outline-none focus:border-green-500"
                      />
                      <button onClick={handlePostalCodeCheck} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                        Check
                      </button>
                    </div>
                 </div>
               </div>
            </div>
            
            {(showReturnPolicy || postalCode === "606702" || postalCode === "606705") && (
              <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-4 bg-gray-50 transition-all">
                 <div className="flex items-start gap-4">
                   <div className="mt-1"><span className="text-orange-500 font-bold px-2 py-0.5 rounded border border-orange-200 bg-orange-50 text-xs">RETURN</span></div>
                   <div>
                      <h4 className="font-bold text-gray-900">Return Delivery</h4>
                      <p className="text-sm text-gray-500">Free 30days Delivery Returns. <span className="underline cursor-pointer font-medium text-gray-700" onClick={() => alert("Items can be returned within 30 days of delivery. Must be unused and in original packaging.")}>Details</span></p>
                   </div>
                 </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Full Specs */}
      {product.specs && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{product.name} Full Specifications</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">General</h3>
              <div className="space-y-2">
                {Object.entries(product.specs).slice(0, 6).map(([key, value]) => (
                   <div key={key} className="flex bg-white p-3 rounded-lg">
                      <span className="w-1/3 text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="w-2/3 text-sm font-medium text-gray-900">{value}</span>
                   </div>
                ))}
              </div>
            </div>
            
            <div className="w-full md:w-1/2 bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Product Details</h3>
              <div className="space-y-2">
                {Object.entries(product.specs).slice(6).map(([key, value]) => (
                   <div key={key} className="flex bg-white p-3 rounded-lg">
                      <span className="w-1/3 text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="w-2/3 text-sm font-medium text-gray-900">{value}</span>
                   </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Similar Items */}
      {similarProducts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Items You Might Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
             {similarProducts.map(product => (
               <ProductCard key={product.id} product={product} />
             ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default ProductDetails;
