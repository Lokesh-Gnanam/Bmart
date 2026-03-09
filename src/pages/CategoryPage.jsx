import { useState } from "react";
import { categories } from "../data/categories";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CategoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filter */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-xl border border-gray-100 sticky top-24">
            <h3 className="font-bold text-lg mb-4 text-gray-900 border-b pb-2">Filters</h3>
            
            <div className="mb-6">
              <h4 className="font-medium text-sm text-gray-700 mb-3">Popular Categories</h4>
              <ul className="space-y-2">
                {categories.slice(0, 5).map(cat => (
                  <li key={`filter-${cat.id}`}>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
                      <span className="text-sm text-gray-600">{cat.name} ({cat.itemCount})</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-3">Price Range</h4>
              <input type="range" className="w-full accent-green-600" />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Min</span>
                <span>Max</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Shop by Category</h1>
            
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search categories..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <div 
                key={category.id} 
                onClick={() => navigate(`/category/${category.id}`)}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 flex items-center space-x-4 group"
              >
                <div className="w-16 h-16 rounded-md bg-gray-50 flex items-center justify-center overflow-hidden p-2">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="object-contain w-full h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{category.name}</h3>
                  <p className="text-xs text-gray-500">{category.itemCount} Items Available</p>
                </div>
              </div>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No categories found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
