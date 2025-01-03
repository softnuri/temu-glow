import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import ProductCard from "./ProductCard";
import { allProducts } from "../data/products";
import "swiper/css";
import "swiper/css/navigation";

const NewProducts = () => {
    const newProducts = allProducts.electronics.slice(0, 5);

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">신상품</h2>
            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                navigation={true}
                modules={[Autoplay, Navigation]}
                autoplay={{
                    delay: 4500,
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
                {newProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                        <ProductCard {...product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default NewProducts;
