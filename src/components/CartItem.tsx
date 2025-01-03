import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

interface CartItemProps {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
    onProductClick: (id: number) => void;
    onQuantityChange: (id: number, newQuantity: number) => void;
    onRemove: (id: number) => void;
}

const CartItem = ({
    id,
    title,
    price,
    quantity,
    image,
    onProductClick,
    onQuantityChange,
    onRemove,
}: CartItemProps) => {
    return (
        <div
            className="py-2 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => onProductClick(id)}
        >
            <div className="flex gap-2 w-full">
                <div className="w-[100px] h-[100px] flex-shrink-0 relative overflow-hidden rounded">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover absolute inset-0"
                    />
                </div>
                <div className="flex-grow">
                    <h3 className="text-base font-medium text-gray-900 mb-1 overflow-hidden whitespace-nowrap text-ellipsis">
                        {title}
                    </h3>
                    <p className="text-gray-600">${price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <Button
                            size="sm"
                            className="scale-80"
                            onClick={(e) => {
                                e.stopPropagation();
                                onQuantityChange(id, quantity - 1);
                            }}
                        >
                            -
                        </Button>
                        <span className="min-w-[3ch] text-center font-mono">
                            {quantity}
                        </span>
                        <Button
                            size="sm"
                            className="scale-80"
                            onClick={(e) => {
                                e.stopPropagation();
                                onQuantityChange(id, quantity + 1);
                            }}
                        >
                            +
                        </Button>
                    </div>
                </div>
                <div className="flex items-start">
                    <IconButton
                        edge="end"
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove(id);
                        }}
                        color="error"
                    >
                        <FontAwesomeIcon icon={faTrash} className="scale-80" />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
