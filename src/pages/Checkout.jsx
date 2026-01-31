import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Your cart is empty 🛒</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Shipping Details */}
      <div className="border p-4 rounded">
        <h2 className="text-lg font-bold mb-4">Shipping Details</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 w-full mb-3"
        />
        <input
          type="text"
          placeholder="Address"
          className="border p-2 w-full mb-3"
        />
        <input
          type="text"
          placeholder="City"
          className="border p-2 w-full mb-3"
        />
        <input
          type="text"
          placeholder="Pincode"
          className="border p-2 w-full mb-3"
        />
      </div>

      {/* Order Summary */}
      <div className="border p-4 rounded">
        <h2 className="text-lg font-bold mb-4">Order Summary</h2>

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between mb-2"
          >
            <span>{item.name}</span>
            <span>₹{item.price}</span>
          </div>
        ))}

        <hr className="my-3" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>

        <button
          onClick={() => navigate("/payment")}
          className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
