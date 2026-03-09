import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

function WhatsNewPage() {
  const newProducts = products.filter(p => p.isNew);
  const [sortBy, setSortBy] = useState("newest");

  const sortedProducts = [...newProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0; // Default: newest first (assuming array is already sorted by newest)
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            New Arrivals
            <span className="ml-3 bg-[#00d632] text-white text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wider">Fresh</span>
          </h1>
          <p className="text-gray-500">Discover the latest products added to our collection</p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-500">Sort by:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium text-gray-600 mb-2">No new products today.</h3>
          <p className="text-gray-400">Please check back later!</p>
        </div>
      )}

    </div>
  );
}

export default WhatsNewPage;
