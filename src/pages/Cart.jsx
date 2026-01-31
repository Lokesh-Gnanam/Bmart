import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (cart.length === 0) {
    return <p className="p-6">Your cart is empty 🛒</p>;
  }

  return (
    <div className="p-6 space-y-4">
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border p-3 rounded"
        >
          <div>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
          </div>
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default Cart;
