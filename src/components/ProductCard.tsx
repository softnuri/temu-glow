import { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
  Box,
  Rating,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  sales?: number;
}

// Create a function to get stored cart items
const getStoredCartItems = () => {
  const storedItems = localStorage.getItem('cartItems');
  return storedItems ? JSON.parse(storedItems) : [];
};

// Create a function to get stored wishlist items
const getStoredWishlistItems = () => {
  const storedItems = localStorage.getItem('wishlistItems');
  return storedItems ? JSON.parse(storedItems) : [];
};

const ProductCard = ({
  id,
  title,
  price,
  originalPrice,
  image,
  rating,
  sales
}: ProductCardProps) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(() => {
    const wishlistItems = getStoredWishlistItems();
    return wishlistItems.some((item: ProductCardProps) => item.id === id);
  });
  
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    const wishlistItems = getStoredWishlistItems();
    const product = { id, title, price, originalPrice, image, rating, sales };
    
    if (!isWishlisted) {
      // Add to wishlist
      const updatedWishlist = [...wishlistItems, product];
      localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
      toast.success(`${title}이(가) 위시리스트에 추가되었습니다.`);
    } else {
      // Remove from wishlist
      const updatedWishlist = wishlistItems.filter((item: ProductCardProps) => item.id !== id);
      localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
      toast.success(`${title}이(가) 위시리스트에서 제거되었습니다.`);
    }
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cartItems = getStoredCartItems();
    const product = { id, title, price, originalPrice, image, rating, sales, quantity: 1 };
    
    // Check if product already exists in cart
    const existingProductIndex = cartItems.findIndex((item: ProductCardProps) => item.id === id);
    
    if (existingProductIndex !== -1) {
      // Update quantity if product exists
      cartItems[existingProductIndex].quantity += 1;
    } else {
      // Add new product if it doesn't exist
      cartItems.push(product);
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    toast.success(`${title}이(가) 장바구니에 추가되었습니다.`);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6,
          '& .MuiCardMedia-root': {
            transform: 'scale(1.05)',
            transition: 'transform 0.3s ease-in-out'
          }
        }
      }}
      onClick={() => navigate(`/product/${id}`)}
    >
      <Box sx={{ position: 'relative', paddingTop: '100%' }}>
        <img
          src={image}
          alt={title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        {discount > 0 && (
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              bgcolor: 'error.main',
              color: 'white',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontWeight: 'bold'
            }}
          >
            -{discount}%
          </Typography>
        )}
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'background.paper',
            '&:hover': { bgcolor: 'grey.200' }
          }}
          onClick={handleWishlist}
        >
          <FontAwesomeIcon
            icon={isWishlisted ? faHeartSolid : faHeartRegular}
            color={isWishlisted ? '#f44336' : undefined}
          />
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          component="h2"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mb: 1
          }}
        >
          {title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
          <Typography variant="h6" component="span">
            ${price.toFixed(2)}
          </Typography>
          {originalPrice && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'line-through' }}
            >
              ${originalPrice.toFixed(2)}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Rating value={rating} readOnly size="small" />
          {sales && (
            <Typography variant="body2" color="text.secondary">
              {sales}+ sold
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions>
        <Button
          fullWidth
          variant="contained"
          onClick={handleAddToCart}
          sx={{ textTransform: 'none' }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;