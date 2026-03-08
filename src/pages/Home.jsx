import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const categories = [
  { name: "Mobiles", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&q=80" },
  { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=150&q=80" },
  { name: "Food", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&q=80" },
  { name: "Cosmetics", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&q=80" },
  { name: "Furnitures", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&q=80" },
  { name: "Gadgets", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&q=80" },
];

const featuredProducts = [
  { id: 1, name: "Wireless Earbuds", subtitle: "Organics and make their original", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", price: 2999, rating: 5 },
  { id: 2, name: "Boat ProEarbuds", subtitle: "Organics and make their original", image: "https://images.unsplash.com/photo-1572569533612-8588362d57ac?w=500&q=80", price: 1999, rating: 5 },
  { id: 3, name: "Apple Airpods pro X", subtitle: "Organics and make their original", image: "https://images.unsplash.com/photo-1606220588913-b3a58ce681ce?w=500&q=80", price: 24999, rating: 5 },
  { id: 4, name: "Nord OnePlus Buds", subtitle: "Organics and make their original", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80", price: 4999, rating: 5 },
  { id: 5, name: "Earbuds", subtitle: "Organics and make their original", image: "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?w=500&q=80", price: 1499, rating: 5 },
  { id: 6, name: "Boat Neo XEarbuds", subtitle: "Organics and make their original", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80", price: 1299, rating: 5 },
  { id: 7, name: "Apple Airpods X", subtitle: "Organics and make their original", image: "https://images.unsplash.com/photo-1588423771073-b8903f840b49?w=500&q=80", price: 19999, rating: 5 },
  { id: 8, name: "Nord OnePlus Buds", subtitle: "Organics and make their original", image: "https://images.unsplash.com/photo-1613040809024-b4befdb51261?w=500&q=80", price: 5499, rating: 5 },
];

function Home() {
  const [products, setProducts] = useState(featuredProducts);

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
            <div key={category.name} className="flex flex-col items-center group cursor-pointer">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-gray-300 transition-all p-1 mb-3 bg-white shadow-sm">
                <img src={category.image} alt={category.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
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
            <button key={filter} className="px-5 py-2 bg-[#e2e4e4] hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-full transition-colors">
              {filter}
            </button>
          ))}
        </div>
        <button className="px-5 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-full transition-colors">
          Sort By
        </button>
      </div>

      {/* Products Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 px-2">Headphones For You!</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;