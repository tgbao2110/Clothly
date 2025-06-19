import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Trash2 } from "lucide-react";

const CartItem = ({ item, onQtyChange, onDelete }) => {
  const [qty, setQty] = useState(item.qty);
  const product = item.product;

  const isOutOfStock = product.stock <= 0;
  const isOverBuying = qty > product.stock;

  useEffect(() => {
    onQtyChange(product._id, qty);
  }, [qty]);

  const handleQtyUpdate = (value) => {
    setQty(Number(value));
  };

  const handleDelete = () => {
    onDelete(product._id);
  };

  return (
    <div
      className={`flex flex-col gap-2 px-4 py-2 ${
        (isOverBuying && !isOutOfStock) ? "bg-amber-100" : ""
      } ${
        (isOutOfStock) ? "bg-accent" : ""
      }`}
    >
      <div className="flex flex-row items-center justify-between gap-4">
        {/* === Left section === */}
        <div className="flex flex-row items-center gap-4">
          <img
            src={product.image}
            alt={product.title}
            className={`w-20 h-20 rounded object-cover ${
              isOutOfStock ? "opacity-30 grayscale" : ""
            }`}
          />
          <div className="flex flex-col max-w-[160px]">
            <h3
              className={`truncate whitespace-nowrap overflow-hidden ${
                isOutOfStock ? "text-muted-foreground" : ""
              }`}
            >
              {product.title}
            </h3>
            <h3
              className={`text-sm font-bold ${
                isOutOfStock ? "text-muted-foreground" : ""
              }`}
            >
              ${product.salePrice}
            </h3>
          </div>
        </div>

        {/* === Right section === */}
        <div className="flex flex-row items-center gap-2">
          <Input
            name="quantity"
            type="number"
            value={qty}
            disabled={isOutOfStock}
            min={1}
            max={product.stock}
            step={1}
            onKeyDown={(e) => e.preventDefault()}
            onChange={(e) => handleQtyUpdate(e.target.value)}
            className={`w-16 ${
              isOutOfStock ? "cursor-not-allowed opacity-50" : ""
            }`}
          />
          <Trash2
            className="w-5 h-5 text-muted-foreground hover:text-destructive cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      </div>

      {/* === Warning === */}
      {isOutOfStock ? (
        <span className="text-sm text-destructive font-medium">
          Out of stock
        </span>
      ) : isOverBuying ? (
        <span className="text-sm text-destructive font-medium">
          Only {product.stock} left in stock. Adjust quantity
        </span>
      ) : (
        <span className="text-sm text-muted-foreground italic">
            In stock: {product.stock}
        </span>
      )}
    </div>
  );
};

export default CartItem;