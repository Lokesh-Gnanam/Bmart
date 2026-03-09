import { useState, useEffect } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { Timer, Zap } from "lucide-react";

function DealsPage() {
  const dealProducts = products.filter(p => p.isDeal);
  const todaysDeals = dealProducts.slice(0, 4);
  const flashSale = dealProducts.slice(4);

  // Countdown timer logic
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          seconds = 59;
          minutes--;
        } else if (hours > 0) {
          seconds = 59;
          minutes = 59;
          hours--;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 mb-10 text-white flex flex-col md:flex-row items-center justify-between shadow-lg">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 flex items-center">
            <Zap className="mr-2 h-8 w-8 text-yellow-300 fill-yellow-300" /> 
            Mega Flash Sale!
          </h1>
          <p className="text-red-100 text-lg">Up to 70% off on top electronics and more.</p>
        </div>
        
        <div className="mt-6 md:mt-0 flex items-center bg-white/20 backdrop-blur-md px-6 py-4 rounded-xl">
          <Timer className="mr-3 h-6 w-6" />
          <div className="flex space-x-2 text-center">
            <div className="bg-white text-red-600 rounded-lg px-3 py-2 font-bold min-w-[50px]">
              <div className="text-xl leading-none">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="text-[10px] uppercase mt-1">Hrs</div>
            </div>
            <span className="text-2xl font-bold self-start mt-1">:</span>
            <div className="bg-white text-red-600 rounded-lg px-3 py-2 font-bold min-w-[50px]">
              <div className="text-xl leading-none">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="text-[10px] uppercase mt-1">Min</div>
            </div>
            <span className="text-2xl font-bold self-start mt-1">:</span>
            <div className="bg-white text-red-600 rounded-lg px-3 py-2 font-bold min-w-[50px]">
              <div className="text-xl leading-none">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              <div className="text-[10px] uppercase mt-1">Sec</div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Deals section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center border-b pb-2">
          Today's Deals <span className="ml-3 bg-red-100 text-red-600 text-xs px-2 py-1 rounded font-bold uppercase">Hot</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {todaysDeals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Flash Sale section */}
      {flashSale.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">More Discounts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {flashSale.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DealsPage;
