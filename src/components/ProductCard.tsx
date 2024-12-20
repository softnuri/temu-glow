import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Star } from 'lucide-react';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
}

const ProductCard = ({ id, title, price, image, rating }: ProductCardProps) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="aspect-square overflow-hidden rounded-md mb-4">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
        <h3 className="font-semibold text-sm line-clamp-2 mb-2">{title}</h3>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${
                index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-lg font-bold text-primary">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="mt-auto p-4 pt-0">
        <Button className="w-full" onClick={() => console.log(`Add product ${id} to cart`)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;