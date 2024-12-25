import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Box,
  Divider,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import { toast } from 'sonner';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  const removeFromCart = (id: number) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    toast.success("상품이 장바구니에서 제거되었습니다.");
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          장바구니
        </Typography>

        <Paper elevation={1} sx={{ p: 2, mb: 4 }}>
          {cartItems.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
              장바구니가 비어있습니다.
            </Typography>
          ) : (
            <List>
              {cartItems.map((item) => (
                <ListItem key={item.id} sx={{ py: 2 }}>
                  <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: 4
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <ListItemText
                        primary={item.title}
                        secondary={`$${item.price.toFixed(2)}`}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                          size="small"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <Typography>{item.quantity}</Typography>
                        <Button
                          size="small"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </Box>
                    </Box>
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => removeFromCart(item.id)}
                        color="error"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
        </Paper>

        {cartItems.length > 0 && (
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              주문 요약
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>총 금액:</Typography>
              <Typography variant="h6">${total.toFixed(2)}</Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => toast.success("주문이 완료되었습니다!")}
            >
              주문하기
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default Cart;