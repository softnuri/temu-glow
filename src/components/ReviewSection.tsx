import { useState, useEffect } from 'react';
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
  productTitle: string;
  productImage: string;
}

interface ReviewSectionProps {
  productId: number;
  productTitle: string;
  productImage: string;
}

const ReviewSection = ({ productId, productTitle, productImage }: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  useEffect(() => {
    // Load reviews from localStorage
    const storedReviews = localStorage.getItem('userReviews');
    if (storedReviews) {
      const allReviews = JSON.parse(storedReviews);
      const productReviews = allReviews.filter((review: Review) => review.productId === productId);
      setReviews(productReviews);
    }
  }, [productId]);

  const handleSubmitReview = () => {
    const allReviews = JSON.parse(localStorage.getItem('userReviews') || '[]');

    if (editingReview) {
      // Update existing review
      const updatedAllReviews = allReviews.map((review: Review) =>
        review.id === editingReview.id
          ? {
              ...review,
              rating: newReview.rating,
              comment: newReview.comment,
            }
          : review
      );
      localStorage.setItem('userReviews', JSON.stringify(updatedAllReviews));
      
      const updatedProductReviews = reviews.map(review =>
        review.id === editingReview.id
          ? {
              ...review,
              rating: newReview.rating,
              comment: newReview.comment,
            }
          : review
      );
      setReviews(updatedProductReviews);
      setEditingReview(null);
      toast.success('리뷰가 수정되었습니다.');
    } else {
      // Create new review
      const review: Review = {
        id: Date.now(),
        productId,
        userId: 'user123',
        rating: newReview.rating,
        comment: newReview.comment,
        createdAt: new Date().toISOString(),
        productTitle,
        productImage,
      };
      
      const updatedAllReviews = [...allReviews, review];
      localStorage.setItem('userReviews', JSON.stringify(updatedAllReviews));
      
      setReviews([...reviews, review]);
      toast.success('리뷰가 등록되었습니다.');
    }
    setNewReview({ rating: 5, comment: '' });
  };

  const handleDeleteReview = (reviewId: number) => {
    const allReviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
    const updatedAllReviews = allReviews.filter((review: Review) => review.id !== reviewId);
    localStorage.setItem('userReviews', JSON.stringify(updatedAllReviews));
    
    setReviews(reviews.filter(r => r.id !== reviewId));
    toast.success('리뷰가 삭제되었습니다.');
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
                onClick={() => handleDeleteReview(review.id)}
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