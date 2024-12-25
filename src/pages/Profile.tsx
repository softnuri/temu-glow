import {
  Container,
  Typography,
  Paper,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faShoppingBag,
  faHeart,
  faLocationDot,
  faCreditCard,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: faShoppingBag, text: '주문 내역', onClick: () => navigate('/cart') },
    { icon: faHeart, text: '위시리스트', onClick: () => navigate('/wishlist') },
    { icon: faLocationDot, text: '배송지 관리', onClick: () => navigate('/profile/address') },
    { icon: faCreditCard, text: '결제 수단', onClick: () => navigate('/profile/payment') },
    { icon: faGear, text: '설정', onClick: () => navigate('/profile/settings') },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
            <Avatar sx={{ width: 100, height: 100 }}>
              <FontAwesomeIcon icon={faUser} size="2x" />
            </Avatar>
            <Box>
              <Typography variant="h5" gutterBottom>
                사용자 이름
              </Typography>
              <Typography variant="body1" color="text.secondary">
                user@example.com
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                onClick={() => navigate('/profile/edit')}
              >
                프로필 수정
              </Button>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <List>
            {menuItems.map((item, index) => (
              <ListItem
                key={index}
                sx={{ py: 2, cursor: 'pointer', '&:hover': { bgcolor: 'grey.100' } }}
                onClick={item.onClick}
              >
                <ListItemIcon>
                  <FontAwesomeIcon icon={item.icon} />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile;