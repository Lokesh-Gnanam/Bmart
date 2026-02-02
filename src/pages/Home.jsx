import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { ChevronRight, Filter, Sparkles, TrendingUp } from "lucide-react";

const categories = [
  { name: "All", count: 120 },
  { name: "Electronics", count: 45 },
  { name: "Fashion", count: 32 },
  { name: "Home & Kitchen", count: 28 },
  { name: "Beauty", count: 19 },
  { name: "Sports", count: 16 },
];

const featuredProducts = [
  { id: 1, name: "Wireless Bluetooth Headphones", price: 2999, discount: 20, rating: 4.5, freeDelivery: true },
  { id: 2, name: "Smart Watch Series 5", price: 12999, discount: 15, rating: 4.7, freeDelivery: true },
  { id: 3, name: "Organic Cotton T-Shirt", price: 899, discount: 30, rating: 4.3, freeDelivery: true },
  { id: 4, name: "Stainless Steel Water Bottle", price: 1499, discount: 25, rating: 4.6, freeDelivery: true },
];

function Home() {
  const [products, setProducts] = useState(featuredProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  // Simulate API call
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockProducts = Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        name: `Premium Product ${i + 1}`,
        price: Math.floor(Math.random() * 5000) + 999,
        discount: Math.random() > 0.5 ? Math.floor(Math.random() * 40) + 10 : 0,
        rating: 4 + Math.random(),
        freeDelivery: Math.random() > 0.3,
      }));
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 dark:from-blue-900/30 dark:to-indigo-900/30" />
        <div className="relative p-8 md:p-12">
          <div className="max-w-xl">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Exclusive Collection
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Premium Shopping
              <span className="block text-blue-600">Experience</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Discover amazing products at incredible prices. Quality guaranteed with fast delivery.
            </p>
            <button className="btn-primary">
              Shop Now <ChevronRight className="inline ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Categories</h2>
          <button className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700">
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`p-4 rounded-xl transition-all duration-200 ${
                selectedCategory === category.name
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 hover:shadow-md border border-gray-100 dark:border-gray-700"
              }`}
            >
              <div className="font-medium">{category.name}</div>
              <div className={`text-sm ${
                selectedCategory === category.name 
                  ? "text-blue-100" 
                  : "text-gray-500 dark:text-gray-400"
              }`}>
                {category.count} items
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="h-6 w-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trending Now</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Products</h2>
          <button className="flex items-center px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;