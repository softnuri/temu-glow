import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import ProductCard from '../components/ProductCard';

// 카테고리별 상품 데이터
const categoryProducts = {
  electronics: [
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
  ],
  fashion: [
    {
      id: 3,
      title: "Casual T-Shirt",
      price: 19.99,
      image: "https://picsum.photos/400/402",
      rating: 4,
    },
    {
      id: 4,
      title: "Denim Jeans",
      price: 49.99,
      image: "https://picsum.photos/400/403",
      rating: 5,
    },
  ],
  home: [
    {
      id: 5,
      title: "Coffee Maker",
      price: 79.99,
      image: "https://picsum.photos/400/404",
      rating: 4,
    },
    {
      id: 6,
      title: "Bed Sheets Set",
      price: 39.99,
      image: "https://picsum.photos/400/405",
      rating: 5,
    },
  ],
  beauty: [
    {
      id: 7,
      title: "Face Cream",
      price: 24.99,
      image: "https://picsum.photos/400/406",
      rating: 4,
    },
    {
      id: 8,
      title: "Lipstick Set",
      price: 19.99,
      image: "https://picsum.photos/400/407",
      rating: 5,
    },
  ],
  sports: [
    {
      id: 9,
      title: "Yoga Mat",
      price: 29.99,
      image: "https://picsum.photos/400/408",
      rating: 4,
    },
    {
      id: 10,
      title: "Dumbbells Set",
      price: 89.99,
      image: "https://picsum.photos/400/409",
      rating: 5,
    },
  ],
  toys: [
    {
      id: 11,
      title: "Building Blocks",
      price: 34.99,
      image: "https://picsum.photos/400/410",
      rating: 4,
    },
    {
      id: 12,
      title: "Remote Control Car",
      price: 44.99,
      image: "https://picsum.photos/400/411",
      rating: 5,
    },
  ],
};

// 카테고리별 스타일 설정
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
  const products = categoryId ? categoryProducts[categoryId as keyof typeof categoryProducts] : categoryProducts.electronics;
  const style = categoryId ? categoryStyles[categoryId as keyof typeof categoryStyles] : categoryStyles.electronics;

  return (
    <div className={`min-h-screen ${style.bgColor}`}>
      <Navbar />
      <CategoryNav />
      <main className="container mx-auto px-4 py-8">
        <div className={`${style.headerBg} rounded-lg p-6 mb-6`}>
          <h1 className={`text-2xl font-bold ${style.textColor}`}>
            {getCategoryTitle(categoryId || '')}
          </h1>
        </div>
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