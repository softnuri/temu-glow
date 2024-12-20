import { Link } from 'react-router-dom';
import { 
  Paper,
  Container,
  Box,
  Typography,
  styled
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlug,
  faTshirt,
  faHome,
  faSparkles,
  faFutbol,
  faTeddyBear
} from '@fortawesome/free-solid-svg-icons';

const categories = [
  { id: 'electronics', name: 'Electronics', icon: faPlug },
  { id: 'fashion', name: 'Fashion', icon: faTshirt },
  { id: 'home', name: 'Home & Garden', icon: faHome },
  { id: 'beauty', name: 'Beauty', icon: faSparkles },
  { id: 'sports', name: 'Sports', icon: faFutbol },
  { id: 'toys', name: 'Toys', icon: faTeddyBear },
];

const CategoryLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1),
  minWidth: '4rem',
  textDecoration: 'none',
  color: theme.palette.text.primary,
  transition: theme.transitions.create(['color', 'transform']),
  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'translateY(-2px)',
  },
}));

const CategoryNav = () => {
  return (
    <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Container maxWidth="xl">
        <Box sx={{
          display: 'flex',
          gap: 4,
          overflowX: 'auto',
          py: 2,
          px: 2,
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          scrollbarWidth: 'none',
        }}>
          {categories.map((category) => (
            <CategoryLink
              key={category.id}
              to={`/category/${category.id}`}
            >
              <FontAwesomeIcon 
                icon={category.icon} 
                size="2x"
                style={{ marginBottom: '0.5rem' }}
              />
              <Typography
                variant="caption"
                component="span"
                sx={{ 
                  whiteSpace: 'nowrap',
                  fontWeight: 500
                }}
              >
                {category.name}
              </Typography>
            </CategoryLink>
          ))}
        </Box>
      </Container>
    </Paper>
  );
};

export default CategoryNav;