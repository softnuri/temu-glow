import {
  Container,
  Typography,
  Grid,
  Box,
  IconButton,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { toast } from 'sonner';

interface WishlistItem {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  sales: number;
}

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('wishlistItems');
    if (storedItems) {
      setWishlistItems(JSON.parse(storedItems));
    }
  }, []);

  const removeFromWishlist = (id: number) => {
    const updatedItems = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updatedItems);
    localStorage.setItem('wishlistItems', JSON.stringify(updatedItems));
    toast.success("상품이 위시리스트에서 제거되었습니다.");
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          위시리스트
        </Typography>

        {wishlistItems.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
            위시리스트가 비어있습니다.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {wishlistItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Box sx={{ position: 'relative' }}>
                  <ProductCard {...item} />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'background.paper',
                      '&:hover': { bgcolor: 'grey.200' }
                    }}
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Wishlist;