import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (total, item) => total + (item.price * (item.quantity || 1)),
    0
  );
  const deliveryCharge = totalAmount > 999 ? 0 : 49;
  const totalPayable = totalAmount + deliveryCharge;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/">
            <button className="btn-primary">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Shopping Cart ({cart.length} items)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={item.image || `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop`}
                  alt={item.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Brand: {item.brand || "Premium"}
                      </p>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => dispatch(updateQuantity({
                          id: item.id,
                          quantity: Math.max(1, (item.quantity || 1) - 1)
                        }))}
                        className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-medium w-8 text-center">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => dispatch(updateQuantity({
                          id: item.id,
                          quantity: (item.quantity || 1) + 1
                        }))}
                        className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-gray-500">
                          ₹{item.price.toLocaleString()} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="font-medium">₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Delivery</span>
                <span className={deliveryCharge === 0 ? "text-green-600 font-medium" : "font-medium"}>
                  {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                </span>
              </div>
              {deliveryCharge > 0 && totalAmount < 999 && (
                <div className="text-sm text-green-600 dark:text-green-400">
                  Add ₹{(999 - totalAmount).toLocaleString()} more for free delivery
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{totalPayable.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full btn-primary py-3 flex items-center justify-center"
            >
              Proceed to Checkout
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>

            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
              You won't be charged until the next step
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Safe and secure checkout
              </div>
              <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Free returns within 30 days
              </div>
              <div className="flex items-center text-sm text-purple-600 dark:text-purple-400">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Quality guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;