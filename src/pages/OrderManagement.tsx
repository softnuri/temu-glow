import { useState } from 'react';
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
  Chip,
} from '@mui/material';
import Navbar from '../components/Navbar';
import { toast } from 'sonner';

interface Order {
  id: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  items: Array<{
    id: number;
    title: string;
    quantity: number;
    price: number;
  }>;
  total: number;
}

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      date: '2024-03-15',
      status: 'pending',
      items: [
        { id: 1, title: '상품 1', quantity: 2, price: 20000 },
        { id: 2, title: '상품 2', quantity: 1, price: 30000 },
      ],
      total: 70000,
    },
    {
      id: 2,
      date: '2024-03-14',
      status: 'completed',
      items: [
        { id: 3, title: '상품 3', quantity: 1, price: 15000 },
      ],
      total: 15000,
    },
  ]);

  const handleCancelOrder = (orderId: number) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: 'cancelled' as const }
        : order
    ));
    toast.success('주문이 취소되었습니다.');
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 0) return order.status === 'pending';
    if (activeTab === 1) return order.status === 'completed';
    return order.status === 'cancelled';
  });

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
                <Typography variant="h6">
                  주문번호: {order.id}
                </Typography>
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

              <List>
                {order.items.map((item) => (
                  <ListItem key={item.id} sx={{ px: 0 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <Typography>
                        {item.title} x {item.quantity}
                      </Typography>
                      <Typography>
                        ₩{item.price.toLocaleString()}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                <Typography variant="h6">
                  총 금액: ₩{order.total.toLocaleString()}
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
        </List>
      </Container>
    </Box>
  );
};

export default OrderManagement;