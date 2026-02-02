import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CreditCard, Smartphone, Wallet, Truck, Shield, Lock } from "lucide-react";

function Payment() {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    saveCard: false,
  });

  const totalAmount = cart.reduce(
    (total, item) => total + (item.price * (item.quantity || 1)),
    0
  );

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: <CreditCard className="h-5 w-5" /> },
    { id: "upi", name: "UPI", icon: <Smartphone className="h-5 w-5" /> },
    { id: "wallet", name: "Wallet", icon: <Wallet className="h-5 w-5" /> },
    { id: "cod", name: "Cash on Delivery", icon: <Truck className="h-5 w-5" /> },
  ];

  const handleCardChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    // Process payment logic here
    navigate("/order-success");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No items to checkout
          </h2>
          <button
            onClick={() => navigate("/")}
            className="btn-primary mt-4"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Secure Payment
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete your purchase with secure payment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Select Payment Method
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`p-4 rounded-lg border transition-all duration-200 ${
                      selectedPayment === method.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded ${
                        selectedPayment === method.id
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-500"
                      }`}>
                        {method.icon}
                      </div>
                      <span className="font-medium">{method.name}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Card Details Form */}
              {selectedPayment === "card" && (
                <form onSubmit={handlePayment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="number"
                      value={cardDetails.number}
                      onChange={handleCardChange}
                      placeholder="1234 5678 9012 3456"
                      className="input-field"
                      required
                      maxLength="19"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={cardDetails.name}
                      onChange={handleCardChange}
                      placeholder="John Doe"
                      className="input-field"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={cardDetails.expiry}
                        onChange={handleCardChange}
                        placeholder="MM/YY"
                        className="input-field"
                        required
                        maxLength="5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleCardChange}
                        placeholder="123"
                        className="input-field"
                        required
                        maxLength="3"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="saveCard"
                      name="saveCard"
                      checked={cardDetails.saveCard}
                      onChange={handleCardChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="saveCard" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      Save card for future payments
                    </label>
                  </div>
                </form>
              )}

              {/* UPI Payment */}
              {selectedPayment === "upi" && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Enter UPI ID (e.g., 1234567890@upi)"
                    className="input-field"
                  />
                  <p className="text-sm text-gray-500">
                    You'll be redirected to your UPI app for payment
                  </p>
                </div>
              )}

              {/* COD Message */}
              {selectedPayment === "cod" && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-yellow-800 dark:text-yellow-200">
                    Cash on Delivery available. Extra ₹20 COD charges apply.
                  </p>
                </div>
              )}

              <div className="flex items-center mt-6 text-sm text-green-600 dark:text-green-400">
                <Shield className="h-4 w-4 mr-2" />
                <span>Your payment is secured with 256-bit SSL encryption</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                {cart.slice(0, 2).map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={item.image || `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w-40&h-40&fit=crop`}
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
                  <span>Total</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full btn-primary py-3 mt-6"
              >
                Pay ₹{totalAmount.toLocaleString()}
              </button>

              <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
                By completing your purchase, you agree to our Terms of Service
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;