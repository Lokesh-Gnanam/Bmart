import { Truck, MapPin, Clock, Search, ShieldCheck } from "lucide-react";
import { useState } from "react";

function DeliveryPage() {
  const [orderId, setOrderId] = useState("");

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (orderId.trim() === "") return;
    alert(`Tracking functionality for order ${orderId} would appear here.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header section */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Delivery & Tracking</h1>
        <p className="text-gray-500 text-lg">Fast, reliable delivery straight to your doorstep. Track your existing orders easily.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Track Order Form */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Track Your Order</h2>
          <p className="text-gray-500 mb-6">Enter your Order ID below to get real-time tracking updates.</p>
          
          <form onSubmit={handleTrackOrder} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="e.g. ORDER-XY1234"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors whitespace-nowrap"
            >
              Track 
            </button>
          </form>
        </div>

        {/* Delivery Info Box */}
        <div className="bg-gradient-to-br from-[#00d632] to-green-500 p-8 rounded-2xl text-white shadow-md">
          <h2 className="text-2xl font-bold mb-6">Delivery Information</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <MapPin className="h-6 w-6 mr-3 flex-shrink-0 opacity-80" />
              <div>
                <strong className="block text-lg">Delivery Areas</strong>
                <span className="opacity-90">We currently deliver to all major metropolitan areas and select regional zones.</span>
              </div>
            </li>
            <li className="flex items-start">
              <Truck className="h-6 w-6 mr-3 flex-shrink-0 opacity-80" />
              <div>
                <strong className="block text-lg">Delivery Charges</strong>
                <span className="opacity-90">Free delivery on orders over $50. Standard charge of $5 applies otherwise.</span>
              </div>
            </li>
            <li className="flex items-start">
              <Clock className="h-6 w-6 mr-3 flex-shrink-0 opacity-80" />
              <div>
                <strong className="block text-lg">Estimated Time</strong>
                <span className="opacity-90">Standard: 2-3 business days. <br /> Express: Same-day delivery available before 2 PM.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-8 text-center">
        <h2 className="text-2xl font-bold mb-10">Our Delivery Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
              <Truck className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Same Day Delivery</h3>
            <p className="text-gray-500 text-sm max-w-xs text-center">Order before 2 PM and get your items delivered the very same day.</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
              <Clock className="h-8 w-8 text-[#6367FF]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Scheduled Delivery</h3>
            <p className="text-gray-500 text-sm max-w-xs text-center">Choose the perfect time slot that works with your busy schedule.</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
              <ShieldCheck className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Secure Handling</h3>
            <p className="text-gray-500 text-sm max-w-xs text-center">Your packages are handled with care and delivered securely to you.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default DeliveryPage;
