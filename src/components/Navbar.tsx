import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  alpha,
  styled
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart,
  faSearch,
  faBars,
  faUser,
  faHeart
} from '@fortawesome/free-solid-svg-icons';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 3,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.08),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  const categories = [
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'home', name: 'Home & Garden' },
    { id: 'beauty', name: 'Beauty' },
    { id: 'sports', name: 'Sports' },
    { id: 'toys', name: 'Toys' },
  ];

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              size="large"
              edge="start"
              sx={{ display: { md: 'none' } }}
              onClick={() => setIsMenuOpen(true)}
            >
              <FontAwesomeIcon icon={faBars} />
            </IconButton>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ 
                textDecoration: 'none', 
                color: 'primary.main',
                fontWeight: 'bold'
              }}
            >
              Temu
            </Typography>
          </Box>

          <Search sx={{ 
            display: { xs: 'none', md: 'flex' },
            flex: 1,
            maxWidth: 'xl',
            mx: 8
          }}>
            <SearchIconWrapper>
              <FontAwesomeIcon icon={faSearch} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="What are you looking for?"
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Search>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => navigate('/wishlist')}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <FontAwesomeIcon icon={faHeart} />
            </IconButton>
            <IconButton onClick={() => navigate('/profile')}>
              <FontAwesomeIcon icon={faUser} />
            </IconButton>
            <IconButton onClick={() => navigate('/cart')}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Mobile search bar */}
        <Box sx={{ 
          display: { xs: 'block', md: 'none' },
          p: 2,
          borderTop: 1,
          borderColor: 'divider'
        }}>
          <Search>
            <SearchIconWrapper>
              <FontAwesomeIcon icon={faSearch} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="What are you looking for?"
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Search>
        </Box>
      </Container>

      {/* Mobile menu drawer */}
      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <Box sx={{ width: 250 }}>
          <List>
            {categories.map((category) => (
              <ListItem
                key={category.id}
                onClick={() => {
                  navigate(`/category/${category.id}`);
                  setIsMenuOpen(false);
                }}
                sx={{ cursor: 'pointer' }}
              >
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;