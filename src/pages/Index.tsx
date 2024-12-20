import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import ProductCard from '../components/ProductCard';

// Mock data - replace with actual API call later
const products = [
  {
    id: 1,
    title: "Wireless Earbuds",
    price: 29.99,
    image: "https://picsum.photos/400/400",
    rating: 4,
  },
  {
    id: 2,
    title: "Smart Watch",
    price: 59.99,
    image: "https://picsum.photos/400/401",
    rating: 5,
  },
  {
    id: 3,
    title: "Phone Case",
    price: 19.99,
    image: "https://picsum.photos/400/402",
    rating: 3,
  },
  {
    id: 4,
    title: "Portable Charger",
    price: 39.99,
    image: "https://picsum.photos/400/403",
    rating: 4,
  },
  {
    id: 5,
    title: "Bluetooth Speaker",
    price: 49.99,
    image: "https://picsum.photos/400/404",
    rating: 5,
  },
  {
    id: 6,
    title: "Laptop Sleeve",
    price: 24.99,
    image: "https://picsum.photos/400/405",
    rating: 4,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CategoryNav />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Featured Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;