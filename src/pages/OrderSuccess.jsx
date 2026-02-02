import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Package, Home, ShoppingBag } from "lucide-react";

function OrderSuccess() {
  const navigate = useNavigate();
  const orderId = `ORDER-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        {/* Success Animation */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full flex items-center justify-center">
            <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
          </div>
          <div className="absolute inset-0 animate-ping opacity-20">
            <div className="w-32 h-32 mx-auto bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Order Confirmed! 🎉
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        {/* Order Details */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Package className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Order ID: {orderId}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We've sent a confirmation email with all the details. You can track your order in the Orders section.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">Estimated Delivery</div>
              <div className="font-bold">3-5 Business Days</div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-sm text-green-600 dark:text-green-400 mb-1">Payment Status</div>
              <div className="font-bold">Confirmed</div>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-sm text-purple-600 dark:text-purple-400 mb-1">Order Status</div>
              <div className="font-bold">Processing</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="btn-primary flex items-center justify-center"
          >
            <Home className="h-5 w-5 mr-2" />
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="btn-secondary flex items-center justify-center"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            View Orders
          </button>
        </div>

        {/* Support Info */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help? <a href="#" className="text-blue-600 hover:text-blue-700">Contact Support</a> or call us at 1800-123-4567
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;