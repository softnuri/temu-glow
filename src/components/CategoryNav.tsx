import { Link } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLaptop,
  faTshirt,
  faCouch,
  faStar,
  faDumbbell,
  faGamepad
} from '@fortawesome/free-solid-svg-icons';

const categories = [
  { id: 'electronics', name: '전자기기', icon: faLaptop, color: '#9b87f5' },
  { id: 'fashion', name: '패션', icon: faTshirt, color: '#D6BCFA' },
  { id: 'home', name: '홈/리빙', icon: faCouch, color: '#F2FCE2' },
  { id: 'beauty', name: '뷰티', icon: faStar, color: '#FEF7CD' },
  { id: 'sports', name: '스포츠', icon: faDumbbell, color: '#FEC6A1' },
  { id: 'toys', name: '완구', icon: faGamepad, color: '#F1F0FB' },
];

const CategoryNav = () => {
  return (
    <Box 
      sx={{ 
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 6,
          py: 3,
          px: 2,
          overflowX: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
        }}>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group flex flex-col items-center min-w-[80px] text-decoration-none transition-all duration-300 hover:-translate-y-1"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: category.color,
                  marginBottom: 1,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  }
                }}
              >
                <FontAwesomeIcon 
                  icon={category.icon}
                  size="lg"
                  style={{ color: '#1A1F2C' }}
                />
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  textAlign: 'center',
                  color: '#1A1F2C',
                }}
              >
                {category.name}
              </Typography>
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default CategoryNav;