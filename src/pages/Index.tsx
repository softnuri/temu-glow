import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import ProductCard from '../components/ProductCard';

const allProducts = {
  electronics: [
    {
      id: 1,
      title: "Wireless Noise Cancelling Earbuds Pro",
      price: 129.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
      rating: 4.5,
      sales: 1234,
    },
    {
      id: 2,
      title: "Smart Watch Series X - Health & Fitness Tracker",
      price: 199.99,
      originalPrice: 299.99,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
      rating: 4.8,
      sales: 856,
    },
    {
      id: 3,
      title: "4K Ultra HD Smart TV - 55 inch",
      price: 499.99,
      originalPrice: 799.99,
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6",
      rating: 4.7,
      sales: 432,
    }
  ],
  fashion: [
    {
      id: 4,
      title: "Premium Cotton Casual T-Shirt",
      price: 24.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      rating: 4.3,
      sales: 2345,
    },
    {
      id: 5,
      title: "Designer Denim Jacket - Vintage Style",
      price: 89.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2",
      rating: 4.6,
      sales: 890,
    },
    {
      id: 6,
      title: "Leather Crossbody Bag",
      price: 59.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
      rating: 4.4,
      sales: 678,
    }
  ],
  home: [
    {
      id: 7,
      title: "Smart Home Security Camera System",
      price: 149.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1558002038-bb4237b50b11",
      rating: 4.7,
      sales: 345,
    },
    {
      id: 8,
      title: "Robot Vacuum Cleaner with Mapping",
      price: 299.99,
      originalPrice: 499.99,
      image: "https://images.unsplash.com/photo-1562254492-377a3ac576f4",
      rating: 4.6,
      sales: 567,
    },
    {
      id: 9,
      title: "Air Purifier with HEPA Filter",
      price: 179.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd",
      rating: 4.5,
      sales: 234,
    }
  ],
  beauty: [
    {
      id: 10,
      title: "Professional Hair Dryer Set",
      price: 79.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da",
      rating: 4.4,
      sales: 789,
    },
  ]
};

const Index = () => {
  const { id: categoryId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');

  // Flatten all products into a single array
  const allProductsList = Object.values(allProducts).flat();

  // Filter products based on category and search query
  const filteredProducts = categoryId
    ? allProducts[categoryId as keyof typeof allProducts]?.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) || []
    : allProductsList.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={setSearchQuery} />
      <CategoryNav />
      <main className="container mx-auto px-4 py-6">
        <div className={`bg-white rounded-lg p-4 mb-6 shadow-sm`}>
          <h1 className="text-xl font-bold text-gray-800">
            {categoryId ? getCategoryTitle(categoryId) : 'Featured Products'}
          </h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </div>
  );
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

export default Index;