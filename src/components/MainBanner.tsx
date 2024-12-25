import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const banners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    title: "최신 노트북 컬렉션",
    description: "새로운 작업 환경을 만나보세요"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    title: "프리미엄 전자기기",
    description: "최고의 성능을 경험하세요"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    title: "스마트 기기 특가",
    description: "한정된 시간 동안만 제공됩니다"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    title: "개발자 워크스테이션",
    description: "완벽한 개발 환경을 구축하세요"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    title: "홈 오피스 설정",
    description: "효율적인 재택근무 환경"
  }
];

const MainBanner = () => {
  return (
    <div className="w-full h-[400px] mb-8">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-full">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
                <h2 className="text-4xl font-bold mb-4">{banner.title}</h2>
                <p className="text-xl">{banner.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainBanner;