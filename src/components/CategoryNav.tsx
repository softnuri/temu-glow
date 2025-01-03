import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const categories = [
    { id: "electronics", name: "전자기기", icon: "💻" },
    { id: "fashion", name: "패션", icon: "👕" },
    { id: "home", name: "홈/리빙", icon: "🏠" },
    { id: "beauty", name: "뷰티", icon: "💄" },
    { id: "sports", name: "스포츠", icon: "⚽" },
    { id: "toys", name: "완구", icon: "🎮" },
];

const CategoryNav = () => {
    return (
        <div className="bg-white shadow-sm mb-6">
            <div className="container mx-auto px-4">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={10}
                    slidesPerView="auto"
                    navigation
                    // centeredSlides={true}
                    className="py-4"
                >
                    {categories.map((category) => (
                        <SwiperSlide key={category.id} className="!w-auto">
                            <Link
                                to={`/category/${category.id}`}
                                className="flex flex-col items-center px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <span className="text-2xl mb-1">
                                    {category.icon}
                                </span>
                                <span className="text-sm text-gray-600">
                                    {category.name}
                                </span>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default CategoryNav;
