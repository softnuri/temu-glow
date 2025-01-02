import { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Rating } from '@mui/material';
import { Button } from '@/components/ui/button';
import Navbar from '../components/Navbar';
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

const MyReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Load reviews from localStorage
    const storedReviews = localStorage.getItem('userReviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  const handleDeleteReview = (reviewId: number) => {
    const updatedReviews = reviews.filter(review => review.id !== reviewId);
    setReviews(updatedReviews);
    localStorage.setItem('userReviews', JSON.stringify(updatedReviews));
    toast.success('리뷰가 삭제되었습니다.');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          내 리뷰 관리
        </Typography>

        {reviews.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography>작성한 리뷰가 없습니다.</Typography>
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {reviews.map((review) => (
              <Paper key={review.id} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <img
                    src={review.productImage}
                    alt={review.productTitle}
                    style={{ width: 100, height: 100, objectFit: 'cover' }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {review.productTitle}
                    </Typography>
                    <Rating value={review.rating} readOnly />
                    <Typography sx={{ mt: 1 }}>{review.comment}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        삭제
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MyReviews;