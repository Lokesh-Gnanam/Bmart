import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import Footer from "./components/Footer";
import CategoryPage from "./pages/CategoryPage";
import DealsPage from "./pages/DealsPage";
import WhatsNewPage from "./pages/WhatsNewPage";
import DeliveryPage from "./pages/DeliveryPage";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <div className="min-h-screen bg-light text-gray-800 font-sans">
      <Navbar />
      <main className="pt-20 pb-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/whats-new" element={<WhatsNewPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          
          <Route path="/payment" element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } />
          
          <Route path="/order-success" element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;