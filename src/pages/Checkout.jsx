import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Check, MapPin, Package, Shield, Truck } from "lucide-react";

function Checkout() {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    saveAddress: true,
  });

  const totalAmount = cart.reduce(
    (total, item) => total + (item.price * (item.quantity || 1)),
    0
  );

  const steps = [
    { id: 1, name: "Delivery", icon: <MapPin className="h-5 w-5" /> },
    { id: 2, name: "Payment", icon: <Package className="h-5 w-5" /> },
    { id: 3, name: "Confirm", icon: <Check className="h-5 w-5" /> },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/payment");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Add items to your cart to proceed to checkout.
          </p>
          <button
            onClick={() => navigate("/")}
            className="btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex flex-col items-center ${
                step.id <= activeStep ? 'text-[#6367FF]' : 'text-gray-400'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step.id <= activeStep 
                    ? 'bg-[#6367FF]/10 text-[#6367FF]' 
                    : 'bg-[#F3F4F4] text-gray-400'
                }`}>
                  {step.icon}
                </div>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-24 h-0.5 mx-4 ${
                  step.id < activeStep ? 'bg-[#6367FF]' : 'bg-[#F3F4F4]'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Delivery Address
              </h2>
              <div className="flex items-center text-sm text-[#6367FF]">
                <Shield className="h-4 w-4 mr-1" />
                Secure & Private
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Complete Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="input-field min-h-[100px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="saveAddress"
                  name="saveAddress"
                  checked={formData.saveAddress}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-[#6367FF] focus:ring-[#6367FF]"
                />
                <label htmlFor="saveAddress" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Save this address for future orders
                </label>
              </div>
            </form>
          </div>

          {/* Delivery Options */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Delivery Options
            </h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#6367FF] cursor-pointer">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full border border-gray-300 mr-3 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#6367FF] hidden"></div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <Truck className="h-5 w-5 text-[#6367FF] mr-2" />
                      <span className="font-medium">Standard Delivery</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      3-5 business days • FREE
                    </p>
                  </div>
                </div>
                <span className="font-bold">FREE</span>
              </label>

              <label className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#6367FF] cursor-pointer">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full border border-gray-300 mr-3 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#6367FF] hidden"></div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <Truck className="h-5 w-5 text-[#FFC300] mr-2" />
                      <span className="font-medium">Express Delivery</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      1-2 business days • Extra charges apply
                    </p>
                  </div>
                </div>
                <span className="font-bold">₹99</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-4">
              {cart.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={item.image || `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w-50&h-50&fit=crop`}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity || 1}</p>
                    </div>
                  </div>
                  <span className="font-medium">₹{(item.price * (item.quantity || 1)).toLocaleString()}</span>
                </div>
              ))}
              {cart.length > 3 && (
                <p className="text-sm text-gray-500 text-center">
                  +{cart.length - 3} more items
                </p>
              )}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Delivery</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Payable</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Including all taxes
              </p>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#6367FF] hover:bg-[#5255d6] text-white py-3 rounded-xl font-bold shadow-lg shadow-[#6367FF]/30 transition-all hover:-translate-y-0.5 mt-6"
            >
              Continue to Payment
            </button>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center text-green-600 dark:text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Your data is 100% secure
              </div>
              <div className="flex items-center text-blue-600 dark:text-blue-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Easy returns within 30 days
              </div>
              <div className="flex items-center text-purple-600 dark:text-purple-400">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                24/7 customer support
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;