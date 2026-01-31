import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="border p-4 rounded">
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button
        className="bg-black tnpm install react-redux @reduxjs/toolkit
ext-white px-3 py-1 mt-2"
        onClick={() => dispatch(addToCart(product))}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
