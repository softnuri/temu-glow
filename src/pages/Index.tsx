import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import ProductCard from '../components/ProductCard';

const categoryProducts = {
  electronics: [
    {
      id: 1,
      title: "Wireless Earbuds with Active Noise Cancellation",
      price: 29.99,
      originalPrice: 59.99,
      image: "https://picsum.photos/400/400",
      rating: 4,
      sales: 1234,
    },
    {
      id: 2,
      title: "Smart Watch with Heart Rate Monitor",
      price: 59.99,
      originalPrice: 99.99,
      image: "https://picsum.photos/400/401",
      rating: 5,
      sales: 856,
    },
  ],
  fashion: [
    {
      id: 3,
      title: "Premium Cotton T-Shirt",
      price: 19.99,
      originalPrice: 29.99,
      image: "https://picsum.photos/400/402",
      rating: 4,
      sales: 2345,
    },
    {
      id: 4,
      title: "Slim Fit Denim Jeans",
      price: 49.99,
      originalPrice: 79.99,
      image: "https://picsum.photos/400/403",
      rating: 5,
      sales: 1567,
    },
  ],
  home: [
    {
      id: 5,
      title: "Automatic Coffee Maker with Timer",
      price: 79.99,
      originalPrice: 129.99,
      image: "https://picsum.photos/400/404",
      rating: 4,
      sales: 678,
    },
    {
      id: 6,
      title: "Luxury Egyptian Cotton Bed Sheets Set",
      price: 39.99,
      originalPrice: 69.99,
      image: "https://picsum.photos/400/405",
      rating: 5,
      sales: 2890,
    },
  ],
  beauty: [
    {
      id: 7,
      title: "Anti-Aging Face Cream with Retinol",
      price: 24.99,
      originalPrice: 44.99,
      image: "https://picsum.photos/400/406",
      rating: 4,
      sales: 3456,
    },
    {
      id: 8,
      title: "Professional Makeup Brush Set",
      price: 19.99,
      originalPrice: 39.99,
      image: "https://picsum.photos/400/407",
      rating: 5,
      sales: 1234,
    },
  ],
  sports: [
    {
      id: 9,
      title: "Premium Non-Slip Yoga Mat",
      price: 29.99,
      originalPrice: 49.99,
      image: "https://picsum.photos/400/408",
      rating: 4,
      sales: 567,
    },
    {
      id: 10,
      title: "Adjustable Dumbbell Set 5-25kg",
      price: 89.99,
      originalPrice: 149.99,
      image: "https://picsum.photos/400/409",
      rating: 5,
      sales: 890,
    },
  ],
  toys: [
    {
      id: 11,
      title: "Educational Building Blocks Set",
      price: 34.99,
      originalPrice: 59.99,
      image: "https://picsum.photos/400/410",
      rating: 4,
      sales: 1234,
    },
    {
      id: 12,
      title: "Remote Control Racing Car",
      price: 44.99,
      originalPrice: 79.99,
      image: "https://picsum.photos/400/411",
      rating: 5,
      sales: 678,
    },
  ],
};

const categoryStyles = {
  electronics: {
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-900',
    headerBg: 'bg-blue-100',
  },
  fashion: {
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-900',
    headerBg: 'bg-pink-100',
  },
  home: {
    bgColor: 'bg-green-50',
    textColor: 'text-green-900',
    headerBg: 'bg-green-100',
  },
  beauty: {
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-900',
    headerBg: 'bg-purple-100',
  },
  sports: {
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-900',
    headerBg: 'bg-orange-100',
  },
  toys: {
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-900',
    headerBg: 'bg-yellow-100',
  },
};

const getCategoryTitle = (categoryId: string) => {
  const titles: { [key: string]: string } = {
    electronics: 'Electronics',
    fashion: 'Fashion',
    home: 'Home & Garden',
    beauty: 'Beauty',
    sports: 'Sports',
    toys: 'Toys',
  };
  return titles[categoryId] || 'Featured Products';
};

const Index = () => {
  const { id: categoryId } = useParams();
  const products = categoryId ? categoryProducts[categoryId as keyof typeof categoryProducts] : [];
  const style = categoryId ? categoryStyles[categoryId as keyof typeof categoryStyles] : categoryStyles.electronics;

  return (
    <div className={`min-h-screen ${style.bgColor}`}>
      <Navbar />
      <CategoryNav />
      <main className="container mx-auto px-4 py-6">
        <div className={`${style.headerBg} rounded-lg p-4 mb-6`}>
          <h1 className={`text-xl font-bold ${style.textColor}`}>
            {getCategoryTitle(categoryId || '')}
          </h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;