import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import ProductCard from '../components/ProductCard';
import MainBanner from '../components/MainBanner';
import BestProducts from '../components/BestProducts';
import NewProducts from '../components/NewProducts';

export const allProducts = {
  electronics: [
    {
      id: 1,
      title: "Wireless Noise Cancelling Earbuds Pro",
      price: 129.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
      rating: 4.5,
      sales: 1234,
      description: "Experience premium sound quality with our latest noise-cancelling earbuds. Features include 24-hour battery life, water resistance, and touch controls.",
      specifications: {
        battery: "24 hours (with case)",
        connectivity: "Bluetooth 5.0",
        waterproof: "IPX4 rated",
        warranty: "1 year"
      },
      features: [
        "Active Noise Cancellation",
        "Transparency Mode",
        "Touch Controls",
        "Voice Assistant Support"
      ]
    },
    {
      id: 2,
      title: "Smart Watch Series X - Health & Fitness Tracker",
      price: 199.99,
      originalPrice: 299.99,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
      rating: 4.8,
      sales: 856,
      description: "Advanced smartwatch with comprehensive health monitoring features. Track your fitness, heart rate, sleep, and more with this stylish device.",
      specifications: {
        display: "1.4 inch AMOLED",
        battery: "Up to 7 days",
        waterproof: "5ATM",
        sensors: "Heart rate, SpO2, GPS"
      },
      features: [
        "24/7 Heart Rate Monitoring",
        "Sleep Tracking",
        "50+ Sport Modes",
        "Built-in GPS"
      ]
    },
    {
      id: 3,
      title: "4K Ultra HD Smart TV - 55 inch",
      price: 499.99,
      originalPrice: 799.99,
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6",
      rating: 4.7,
      sales: 432,
      description: "Immerse yourself in stunning 4K resolution with HDR support. Smart features include built-in streaming apps and voice control.",
      specifications: {
        resolution: "4K Ultra HD (3840 x 2160)",
        hdr: "HDR10+",
        refresh: "120Hz",
        audio: "Dolby Atmos"
      },
      features: [
        "Smart TV Platform",
        "Voice Control",
        "Gaming Mode",
        "Screen Mirroring"
      ]
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
      description: "Made from 100% organic cotton, this comfortable t-shirt features a modern fit and is perfect for everyday wear.",
      specifications: {
        material: "100% Organic Cotton",
        care: "Machine washable",
        fit: "Regular fit",
        sizes: "XS to XXL"
      },
      features: [
        "Breathable Fabric",
        "Pre-shrunk",
        "Eco-friendly",
        "Double-stitched hems"
      ]
    },
    {
      id: 5,
      title: "Designer Denim Jacket - Vintage Style",
      price: 89.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2",
      rating: 4.6,
      sales: 890,
      description: "Classic denim jacket with a vintage wash and modern cut. Features premium quality denim and authentic detailing.",
      specifications: {
        material: "Premium Denim",
        wash: "Vintage stonewash",
        fit: "Regular fit",
        closure: "Button front"
      },
      features: [
        "Authentic Detailing",
        "Multiple Pockets",
        "Adjustable Waist",
        "Heavy-duty Buttons"
      ]
    },
    {
      id: 6,
      title: "Leather Crossbody Bag",
      price: 59.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
      rating: 4.4,
      sales: 678,
      description: "Elegant crossbody bag made from genuine leather. Perfect size for daily essentials with multiple compartments.",
      specifications: {
        material: "Genuine Leather",
        dimensions: "22cm x 15cm x 7cm",
        strap: "Adjustable",
        closure: "Magnetic snap"
      },
      features: [
        "Multiple Compartments",
        "Card Slots",
        "Phone Pocket",
        "Adjustable Strap"
      ]
    }
  ],
  home: [
    {
      id: 8,
      title: "Robot Vacuum Cleaner with Mapping",
      price: 299.99,
      originalPrice: 499.99,
      image: "https://images.unsplash.com/photo-1562254492-377a3ac576f4",
      rating: 4.6,
      sales: 567,
      description: "Smart robot vacuum with advanced mapping technology and automatic dirt detection. Perfect for any home.",
      specifications: {
        battery: "150 minutes runtime",
        noise: "60dB",
        suction: "2500Pa",
        capacity: "0.6L"
      },
      features: [
        "Smart Mapping",
        "App Control",
        "Auto Recharge",
        "Schedule Cleaning"
      ]
    },
    {
      id: 9,
      title: "Air Purifier with HEPA Filter",
      price: 179.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd",
      rating: 4.5,
      sales: 234,
      description: "Advanced air purifier with true HEPA filter, perfect for allergies and removing 99.97% of airborne particles.",
      specifications: {
        coverage: "400 sq ft",
        filter: "True HEPA",
        modes: "3 speed settings",
        noise: "25-48dB"
      },
      features: [
        "Air Quality Indicator",
        "Auto Mode",
        "Timer Function",
        "Filter Change Indicator"
      ]
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
      description: "Professional-grade hair dryer with multiple attachments and ionic technology for faster drying and less frizz.",
      specifications: {
        power: "1875W",
        settings: "3 heat, 2 speed",
        technology: "Ionic",
        cord: "9ft salon length"
      },
      features: [
        "Ionic Technology",
        "Cool Shot Button",
        "Multiple Attachments",
        "Ergonomic Design"
      ]
    }
  ]
};

const Index = () => {
  const { id: categoryId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');

  const allProductsList = Object.values(allProducts).flat();

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
      <main className="container mx-auto px-4 py-6">
        {!categoryId && <MainBanner />}
        <CategoryNav />
        {!categoryId && (
          <>
            <BestProducts />
            <NewProducts />
          </>
        )}
        <div className={`bg-white rounded-lg p-4 mb-6 shadow-sm`}>
          <h1 className="text-xl font-bold text-gray-800">
            {categoryId ? getCategoryTitle(categoryId) : '추천 상품'}
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
    electronics: '전자기기',
    fashion: '패션',
    home: '홈/리빙',
    beauty: '뷰티',
    sports: '스포츠',
    toys: '완구',
  };
  return titles[categoryId] || '추천 상품';
};

export default Index;
