import { useParams, useNavigate } from 'react-router-dom';
import { 
  Button, 
  Container, 
  Typography, 
  Rating, 
  IconButton,
  Paper,
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faHeart, 
  faShare,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import { toast } from 'sonner';
import { allProducts } from './Index';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the product from all categories
  const product = Object.values(allProducts)
    .flat()
    .find(p => p.id === Number(id));

  if (!product) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4">Product not found</Typography>
          <Button
            startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
            onClick={() => navigate(-1)}
            sx={{ mt: 2 }}
            color="inherit"
          >
            Go Back
          </Button>
        </Container>
      </Box>
    );
  }

  const discount = Math.round((1 - product.price / (product.originalPrice || product.price)) * 100);

  const handleAddToCart = () => {
    toast.success("장바구니에 추가되었습니다!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("링크가 복사되었습니다!");
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
          color="inherit"
        >
          뒤로가기
        </Button>

        <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                aspectRatio: '1/1',
                borderRadius: 2,
                overflow: 'hidden'
              }}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {product.title}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating value={product.rating} readOnly />
                  {product.sales && (
                    <Typography variant="body2" color="text.secondary">
                      {product.sales}+ 구매
                    </Typography>
                  )}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                  <Typography variant="h4" component="span">
                    ${product.price}
                  </Typography>
                  {product.originalPrice && (
                    <Typography
                      variant="h6"
                      component="span"
                      color="text.secondary"
                      sx={{ textDecoration: 'line-through' }}
                    >
                      ${product.originalPrice}
                    </Typography>
                  )}
                  {discount > 0 && (
                    <Typography variant="h6" component="span" color="error.main">
                      -{discount}%
                    </Typography>
                  )}
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleAddToCart}
                    fullWidth
                  >
                    장바구니 담기
                  </Button>
                  <IconButton onClick={() => toast.success("위시리스트에 추가되었습니다!")}>
                    <FontAwesomeIcon icon={faHeart} />
                  </IconButton>
                  <IconButton onClick={handleShare}>
                    <FontAwesomeIcon icon={faShare} />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProductDetail;