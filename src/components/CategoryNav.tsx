import { Link } from 'react-router-dom';

const categories = [
  { id: 'electronics', name: 'Electronics', icon: '🔌' },
  { id: 'fashion', name: 'Fashion', icon: '👕' },
  { id: 'home', name: 'Home & Garden', icon: '🏠' },
  { id: 'beauty', name: 'Beauty', icon: '💄' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'toys', name: 'Toys', icon: '🧸' },
];

const CategoryNav = () => {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto">
        <div className="flex items-center gap-4 overflow-x-auto py-3 px-4 scrollbar-hide">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="flex flex-col items-center min-w-[4rem] text-center gap-1 hover:text-primary transition-colors"
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-xs whitespace-nowrap">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;