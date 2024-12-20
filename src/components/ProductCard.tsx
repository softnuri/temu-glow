import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Star } from 'lucide-react';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  sales?: number;
}

const ProductCard = ({ 
  id, 
  title, 
  price, 
  originalPrice, 
  image, 
  rating, 
  sales 
}: ProductCardProps) => {
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow border-none">
      <CardContent className="p-3">
        <div className="aspect-square overflow-hidden rounded-lg mb-3 relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </div>
          )}
        </div>
        <div className="space-y-2">
          <h3 className="text-sm line-clamp-2">{title}</h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`h-4 w-4 ${
                    index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            {sales && <span className="ml-1">{sales}+ sold</span>}
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto p-3 pt-0">
        <Button 
          className="w-full bg-primary hover:bg-primary/90" 
          onClick={() => console.log(`Add product ${id} to cart`)}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;