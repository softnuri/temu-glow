import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Rating } from '@mui/material';
import { toast } from 'sonner';

interface Review {
  id: number;
  productId: number;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewSectionProps {
  productId: number;
}

const ReviewSection = ({ productId }: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const handleSubmitReview = () => {
    if (editingReview) {
      // 리뷰 수정
      const updatedReviews = reviews.map(review =>
        review.id === editingReview.id
          ? {
              ...review,
              rating: newReview.rating,
              comment: newReview.comment,
            }
          : review
      );
      setReviews(updatedReviews);
      setEditingReview(null);
      toast.success('리뷰가 수정되었습니다.');
    } else {
      // 새 리뷰 작성
      const review: Review = {
        id: Date.now(),
        productId,
        userId: 'user123', // 실제 구현시 로그인된 사용자 ID 사용
        rating: newReview.rating,
        comment: newReview.comment,
        createdAt: new Date().toISOString(),
      };
      setReviews([...reviews, review]);
      toast.success('리뷰가 등록되었습니다.');
    }
    setNewReview({ rating: 5, comment: '' });
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">상품 리뷰</h3>
      
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="mb-4">
          <Rating
            value={newReview.rating}
            onChange={(_, value) => setNewReview({ ...newReview, rating: value || 5 })}
          />
        </div>
        <Textarea
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          placeholder="리뷰를 작성해주세요"
          className="mb-2"
        />
        <Button onClick={handleSubmitReview}>
          {editingReview ? '리뷰 수정' : '리뷰 작성'}
        </Button>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <Rating value={review.rating} readOnly />
              <div className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
            <div className="mt-2 space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingReview(review);
                  setNewReview({
                    rating: review.rating,
                    comment: review.comment,
                  });
                }}
              >
                수정
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setReviews(reviews.filter(r => r.id !== review.id));
                  toast.success('리뷰가 삭제되었습니다.');
                }}
              >
                삭제
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;