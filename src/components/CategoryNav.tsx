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
        <div className="bg-white shadow-sm mb-6 sticky top-[120px] md:top-[64px] z-10">
            <div className="container mx-auto px-4 relative">
                <style>
                    {`
                        .category-swiper .swiper-button-prev,
                        .category-swiper .swiper-button-next {
                            width: 30px;
                            height: 30px;
                            background-color: white;
                            border-radius: 50%;
                            box-shadow: 0 2px 4px rgba(0,0,0,1);
                        }
                        .category-swiper .swiper-button-prev {
                            left: 0px;
                        }
                        .category-swiper .swiper-button-next {
                            right: 0px;
                        }
                        .category-swiper .swiper-button-prev::after,
                        .category-swiper .swiper-button-next::after {
                            font-size: 20px;
                            color:rgb(17, 96, 145);
                            font-weight: bold;
                        }
                    `}
                </style>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={10}
                    slidesPerView="auto"
                    navigation
                    className="category-swiper py-4"
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
