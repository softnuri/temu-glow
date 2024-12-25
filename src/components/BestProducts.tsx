import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import ProductCard from './ProductCard';
import { allProducts } from '../pages/Index';
import 'swiper/css';
import 'swiper/css/navigation';

const BestProducts = () => {
  // 판매량(sales)을 기준으로 상위 5개 상품 선택
  const bestProducts = Object.values(allProducts)
    .flat()
    .sort((a, b) => (b.sales || 0) - (a.sales || 0))
    .slice(0, 5);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">베스트 상품</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        navigation={true}
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="product-swiper"
      >
        {bestProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BestProducts;