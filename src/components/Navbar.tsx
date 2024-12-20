import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ShoppingCart, Search, Menu } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <Link to="/" className="text-2xl font-bold text-primary">
              TemuClone
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pr-10"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full mb-2"
            />
            <div className="space-y-2">
              <Link to="/category/electronics" className="block py-2">
                Electronics
              </Link>
              <Link to="/category/fashion" className="block py-2">
                Fashion
              </Link>
              <Link to="/category/home" className="block py-2">
                Home & Garden
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;