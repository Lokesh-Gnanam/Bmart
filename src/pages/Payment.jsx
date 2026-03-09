import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CreditCard, Smartphone, Wallet, Truck, Shield, Lock } from "lucide-react";
import { clearCart } from "../redux/cartSlice";

function Payment() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
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
    if (cart.length === 0) return;
    dispatch(clearCart());
    navigate("/order-success");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
             <ShoppingCart className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8">Add items to your cart to proceed with checkout.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#00d632] hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#f9fafb]">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
           <h1 className="text-3xl font-extrabold text-gray-900">Checkout</h1>
           <div className="flex items-center text-green-600 bg-green-50 px-3 py-1.5 rounded-full text-sm font-bold">
              <Shield className="w-4 h-4 mr-1.5" /> Secure Checkout
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 rounded bg-gray-900 text-white flex items-center justify-center text-sm mr-3">1</span>
                Payment Method
              </h2>

              <div className="space-y-3 mb-8">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      selectedPayment === method.id
                        ? "border-[#00d632] bg-green-50/30"
                        : "border-gray-100 hover:border-gray-200 bg-white"
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="payment_method" 
                      checked={selectedPayment === method.id}
                      onChange={() => setSelectedPayment(method.id)}
                      className="w-5 h-5 text-[#00d632] focus:ring-[#00d632] border-gray-300" 
                    />
                    <div className="ml-4 flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${selectedPayment === method.id ? "bg-green-100 text-[#00d632]" : "bg-gray-50 text-gray-500"}`}>
                        {method.icon}
                      </div>
                      <span className={`font-bold ${selectedPayment === method.id ? "text-gray-900" : "text-gray-700"}`}>
                        {method.name}
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Card Details Form */}
              {selectedPayment === "card" && (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 animate-fadeIn">
                  <form id="payment-form" onSubmit={handlePayment} className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="number"
                        value={cardDetails.number}
                        onChange={handleCardChange}
                        placeholder="0000 0000 0000 0000"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00d632] focus:border-transparent outline-none transition-all"
                        required
                        maxLength="19"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={cardDetails.name}
                        onChange={handleCardChange}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00d632] focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiry"
                          value={cardDetails.expiry}
                          onChange={handleCardChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00d632] focus:border-transparent outline-none transition-all"
                          required
                          maxLength="5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="password"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardChange}
                          placeholder="•••"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00d632] focus:border-transparent outline-none transition-all"
                          required
                          maxLength="4"
                        />
                      </div>
                    </div>

                    <div className="flex items-center pt-2">
                      <input
                        type="checkbox"
                        id="saveCard"
                        name="saveCard"
                        checked={cardDetails.saveCard}
                        onChange={handleCardChange}
                        className="rounded border-gray-300 text-[#00d632] focus:ring-[#00d632] w-4 h-4 cursor-pointer"
                      />
                      <label htmlFor="saveCard" className="ml-2 text-sm text-gray-600 cursor-pointer">
                        Save this card for faster checkout next time
                      </label>
                    </div>
                  </form>
                </div>
              )}

              {/* UPI Payment */}
              {selectedPayment === "upi" && (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 animate-fadeIn space-y-4 text-center">
                  <div className="max-w-xs mx-auto">
                    <input
                      type="text"
                      placeholder="Enter UPI ID (username@bank)"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00d632] focus:border-transparent outline-none transition-all text-center"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    A payment request will be sent to your UPI app.
                  </p>
                </div>
              )}

              {/* COD Message */}
              {selectedPayment === "cod" && (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 animate-fadeIn flex items-center">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Pay on Delivery</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Pay with cash or UPI scanner when your order arrives.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
              <h3 className="font-bold text-gray-900 mb-6 border-b pb-4">Order Summary</h3>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg p-2 border border-gray-100 flex-shrink-0">
                       <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight">{item.name}</p>
                      <div className="flex justify-between items-center mt-1">
                         <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                         <span className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm text-gray-600 border-t pt-4 border-gray-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold text-[#00d632]">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span className="font-medium text-gray-900">$0.00</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <span className="font-bold text-gray-900 text-lg">Total</span>
                <span className="font-extrabold text-2xl text-gray-900">${totalAmount.toFixed(2)}</span>
              </div>

              <button
                type={selectedPayment === "card" ? "submit" : "button"}
                form={selectedPayment === "card" ? "payment-form" : undefined}
                onClick={selectedPayment !== "card" ? handlePayment : undefined}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl mt-8 transition-colors flex items-center justify-center shadow-lg shadow-gray-200"
              >
                <Lock className="w-4 h-4 mr-2" />
                Pay ${(totalAmount).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;