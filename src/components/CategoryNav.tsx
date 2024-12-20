import { Link } from 'react-router-dom';

const categories = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'home', name: 'Home & Garden' },
  { id: 'beauty', name: 'Beauty' },
  { id: 'sports', name: 'Sports' },
  { id: 'toys', name: 'Toys' },
];

const CategoryNav = () => {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-6 overflow-x-auto py-4 scrollbar-hide">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="text-gray-600 hover:text-primary whitespace-nowrap transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;