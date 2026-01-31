import ProductCard from "../components/ProductCard";

const products = [
  {
    id: 1,
    name: "iPhone 15",
    price: 79999,
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    name: "Laptop",
    price: 54999,
    image: "https://via.placeholder.com/300",
  },
  {
    id: 3,
    name: "Headphones",
    price: 2999,
    image: "https://via.placeholder.com/300",
  },
];

function Home() {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default Home;
