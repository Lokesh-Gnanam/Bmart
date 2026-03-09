import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products as allProducts } from "../data/products";

const categories = [
  { name: "Mobiles", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&q=80" },
  { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=150&q=80" },
  { name: "Food", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&q=80" },
  { name: "Cosmetics", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&q=80" },
  { name: "Furnitures", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&q=80" },
  { name: "Gadgets", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&q=80" },
];

function Home() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  
  const [products, setProducts] = useState(allProducts);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All Filters");

  useEffect(() => {
    let filtered = [...allProducts];
    
    // Search Filter
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Category Filter
    if (activeCategory) {
      // Mapping display names to data categories
      const categoryMap = {
        "Mobiles": "smartphone",
        "Electronics": "electronics",
        "Food": "food",
        "Cosmetics": "beauty",
        "Furnitures": "furniture",
        "Gadgets": "gadget",
        "Headphones": "headphone"
      };
      const mappedCategory = categoryMap[activeCategory] || activeCategory.toLowerCase();
      filtered = filtered.filter(p => p.category === mappedCategory || p.category.includes(mappedCategory));
    }
    
    // Sort Filter
    switch(activeFilter) {
      case "Price":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Review":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "Type":
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        // All Filters / Color / Headphone Type logic could be complex, keeping default
        break;
    }
    
    setProducts(filtered);
  }, [searchQuery, activeCategory, activeFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-light pb-12">
      
      {/* Hero Banner */}
      <div className="relative mt-6 mb-12 rounded-3xl overflow-hidden bg-gradient-to-r from-[#eb9b65] to-[#f4b37f] h-[250px] shadow-sm">
        <div className="absolute inset-0 flex items-center justify-end md:pr-16 text-center md:text-left z-10 px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-md max-w-lg">
            Grab Upto 30% off <br /> on Selected Headphones
          </h1>
        </div>
        {/* Decorative circle placeholder for image if absent, or an actual image */}
        <div className="absolute left-10 md:left-24 -bottom-4 w-48 h-48 md:w-64 md:h-64 bg-white/20 rounded-full blur-2xl"></div>
        <img 
          src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&q=80" 
          alt="Happy Customer" 
          className="absolute left-4 md:left-24 bottom-0 h-full object-cover object-top drop-shadow-2xl mix-blend-luminosity opacity-80"
          style={{ maskImage: "linear-gradient(to top, transparent, black 20%)", WebkitMaskImage: "linear-gradient(to top, transparent, black 20%)" }}
        />
      </div>

      {/* Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Categories</h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {categories.map((category) => (
            <div 
              key={category.name} 
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => setActiveCategory(activeCategory === category.name ? null : category.name)}
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 transition-all p-1 mb-3 bg-white shadow-sm ${activeCategory === category.name ? 'border-green-500' : 'border-transparent group-hover:border-gray-300'}`}>
                <img src={category.image} alt={category.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <span className={`text-sm font-medium ${activeCategory === category.name ? 'text-green-600 font-bold' : 'text-gray-700'}`}>{category.name}</span>
            </div>
          ))}
        </div>
        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 space-x-1.5">
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4 px-2">
        <div className="flex flex-wrap gap-3">
          {["Headphone Type", "Price", "Color", "Review", "All Filters"].map((filter) => (
            <button 
              key={filter} 
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-colors ${activeFilter === filter ? 'bg-gray-800 text-white' : 'bg-[#e2e4e4] hover:bg-gray-300 text-gray-700'}`}
            >
              {filter}
            </button>
          ))}
        </div>
        <button className="px-5 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-full transition-colors">
          Sort By {activeFilter !== "All Filters" && `: ${activeFilter}`}
        </button>
      </div>

      {/* Products Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 px-2">
          {searchQuery ? `Search Results for "${searchQuery}"` : activeCategory ? `${activeCategory} For You!` : "Products For You!"}
        </h2>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100">
            No products found matching your criteria.
          </div>
        )}
      </div>

    </div>
  );
}

export default Home;