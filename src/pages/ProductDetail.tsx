import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, ArrowLeft, Heart, Share2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 실제 프로젝트에서는 API를 통해 상품 데이터를 가져와야 합니다
  const product = {
    id: Number(id),
    title: "Anti-Aging Face Cream with Retinol",
    price: 24.99,
    originalPrice: 44.99,
    image: "https://picsum.photos/400/406",
    rating: 4,
    sales: 3456,
    description: "고품질 레티놀이 함유된 안티에이징 페이스 크림으로, 주름 개선과 피부 탄력 증진에 도움을 줍니다. 수분 공급과 피부 재생 효과가 뛰어나며, 민감한 피부에도 적합합니다.",
    features: [
      "레티놀 함유로 주름 개선 효과",
      "24시간 지속되는 보습력",
      "민감성 피부 테스트 완료",
      "무향료, 무파라벤",
      "한국 화장품 인증"
    ],
    specifications: {
      용량: "50ml",
      사용기한: "제조일로부터 12개월",
      제조국: "대한민국",
      피부타입: "모든 피부타입"
    }
  };

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  const handleAddToCart = () => {
    toast.success("장바구니에 추가되었습니다!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("링크가 복사되었습니다!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 mb-6 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          뒤로가기
        </button>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl font-bold">{product.title}</h1>
              
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-5 w-5 ${
                        index < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">{product.sales}+ 구매</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">${product.price}</span>
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
                <span className="text-red-500 font-bold">-{discount}%</span>
              </div>

              <p className="text-gray-600">{product.description}</p>

              <div className="space-y-2">
                <h3 className="font-bold">주요 특징:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold">제품 상세:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600">{key}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  장바구니 담기
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => toast.success("위시리스트에 추가되었습니다!")}
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;