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
                  <Typography variant="body2" color="text.secondary">
                    {product.sales}+ 구매
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                  <Typography variant="h4" component="span">
                    ${product.price}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="span"
                    color="text.secondary"
                    sx={{ textDecoration: 'line-through' }}
                  >
                    ${product.originalPrice}
                  </Typography>
                  <Typography variant="h6" component="span" color="error.main">
                    -{discount}%
                  </Typography>
                </Box>

                <Typography variant="body1" color="text.secondary" paragraph>
                  {product.description}
                </Typography>

                <Box sx={{ my: 2 }}>
                  <Typography variant="h6" gutterBottom>주요 특징:</Typography>
                  <List>
                    {product.features.map((feature, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Divider />

                <Box sx={{ my: 2 }}>
                  <Typography variant="h6" gutterBottom>제품 상세:</Typography>
                  <Grid container spacing={1}>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <Grid item xs={6} key={key}>
                        <Typography variant="body2" color="text.secondary">
                          {key}: {value}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
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