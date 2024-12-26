import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
} from '@mui/material';
import Navbar from '../components/Navbar';
import { toast } from 'sonner';

interface OrderItem {
  id: number;
  title: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  items: OrderItem[];
  total: number;
}

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  const handleCancelOrder = (orderId: number) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId
        ? { ...order, status: 'cancelled' as const }
        : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    toast.success('주문이 취소되었습니다.');
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 0) return order.status === 'pending';
    if (activeTab === 1) return order.status === 'completed';
    return order.status === 'cancelled';
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          주문 관리
        </Typography>

        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ mb: 3 }}
        >
          <Tab label="진행중" />
          <Tab label="완료" />
          <Tab label="취소" />
        </Tabs>

        <List>
          {filteredOrders.map((order) => (
            <Paper key={order.id} sx={{ mb: 2, p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography variant="h6">
                    주문번호: {order.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    주문일시: {formatDate(order.date)}
                  </Typography>
                </Box>
                <Chip
                  label={
                    order.status === 'pending' ? '진행중' :
                    order.status === 'completed' ? '완료' : '취소'
                  }
                  color={
                    order.status === 'pending' ? 'primary' :
                    order.status === 'completed' ? 'success' : 'error'
                  }
                />
              </Box>

              <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
                {order.items.map((item) => (
                  <ListItem key={item.id} sx={{ py: 2 }}>
                    <Box sx={{ display: 'flex', width: '100%', gap: 2 }}>
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
                        <Typography variant="subtitle1">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          수량: {item.quantity}개
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          ${item.price.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                ))}
              </List>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                <Typography variant="h6">
                  총 금액: ${order.total.toFixed(2)}
                </Typography>
                {order.status === 'pending' && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    주문 취소
                  </Button>
                )}
              </Box>
            </Paper>
          ))}
          
          {filteredOrders.length === 0 && (
            <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
              해당하는 주문이 없습니다.
            </Typography>
          )}
        </List>
      </Container>
    </Box>
  );
};

export default OrderManagement;