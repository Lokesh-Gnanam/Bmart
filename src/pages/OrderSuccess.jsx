import React from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

function OrderSuccess() {
  const navigate = useNavigate();
  const orderId = `8984294820`; // Matches the image roughly

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-200/50">
      
      {/* Main Card */}
      <div className="bg-white rounded-[40px] p-10 md:p-14 w-full max-w-lg text-center shadow-2xl relative overflow-hidden">
        
        {/* Animated Background Blobs for Confetti/Party effect */}
        <div className="absolute top-0 left-0 w-full h-64 overflow-hidden pointer-events-none">
           <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
           <div className="absolute top-10 flex w-full justify-center">
              <div className="w-40 h-40 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
           </div>
           <div className="absolute top-0 -right-10 w-48 h-48 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>

        {/* Checkmark Icon */}
        <div className="relative z-10 mx-auto w-32 h-32 mb-8 mt-4 flex items-center justify-center">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse opacity-50"></div>
          <div className="absolute inset-2 bg-gradient-to-tr from-green-400 to-[#00d632] rounded-full shadow-lg shadow-green-300/50 flex items-center justify-center transform hover:scale-105 transition-transform">
            <Check className="h-12 w-12 text-white stroke-[3px]" />
          </div>
          {/* Decorative small circles simulating confetti */}
          <div className="absolute top-0 right-4 w-3 h-3 border-2 border-purple-400 rounded-full"></div>
          <div className="absolute bottom-4 left-0 w-2 h-2 border-2 border-blue-400 rounded-full"></div>
          <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-0 right-8 w-2 h-2 bg-red-400 rounded-full"></div>
          <div className="absolute top-1/2 -right-4 w-3 h-1 bg-orange-400 rounded-full rotate-45"></div>
          <div className="absolute -top-4 left-1/2 w-4 h-0.5 bg-blue-400 rounded-full -rotate-45"></div>
          <div className="absolute -bottom-4 left-1/2 w-3 h-1 bg-green-400 rounded-full rotate-12"></div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3 relative z-10 leading-snug">
          Your order has been<br />accepted
        </h1>
        
        <p className="text-gray-500 font-medium mb-10 relative z-10 text-[15px]">
          Transaction ID: {orderId}
        </p>

        {/* Action Button */}
        <button
          onClick={() => navigate("/")}
          className="relative z-10 w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-orange-500 to-[#ff6b00] hover:from-orange-600 hover:to-[#e66000] text-white font-bold rounded-full transition-all duration-300 shadow-md transform hover:-translate-y-0.5"
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
}

export default OrderSuccess;