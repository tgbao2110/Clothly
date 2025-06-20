import { useEffect, useState } from "react";
import {
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import CartItem from "./cart-item";

const CartSheetContent = ({isCartOpen}) => {
  const currentItems = useSelector(state => state.cart.items);
  const [items, setItems] = useState([]);
  //
  useEffect(() => {
    if(isCartOpen)
        setItems(currentItems);
  },[isCartOpen, currentItems]);
  //
  // Handle update
  const handleQtyChange = (productId, newQty) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product._id === productId ? { ...item, qty: Number(newQty) } : item
      )
    );
  };
  //
  // Handle Delete
  const handleDeleteItem = productId => {
    setItems((prev) => prev.filter((item) => item.product._id !== productId));
  };
  //
  // Validate product qty
  const hasInvalidItems = items.some(
    item => item.product.stock <= 0 || item.qty > item.product.stock
  );
  //
  // Handle Checkout
  const handleCheckout = () => {
    console.log("Checking out:", items);
  };
  //
  // Handle Update when sheet closed
  useEffect(() => {
    if (!isCartOpen && items.length > 0) {
        console.log("Updating cart: ", items);
    }
  }, [isCartOpen])

  return (
    <SheetContent className="flex flex-col h-full p-0">
      <SheetHeader className="border-b">
        <SheetTitle>My Cart</SheetTitle>
      </SheetHeader>

      <div className="flex flex-col w-full gap-4 overflow-y-auto">
        {items.map((item) => (
          <CartItem
            key={item.product._id}
            item={item}
            onQtyChange={handleQtyChange}
            onDelete={handleDeleteItem}
          />
        ))}
      </div>

      <SheetFooter className="sticky bottom-0 border-t px-4 py-4 z-10">
        <div className="space-y-4">
          <div className="flex flex-row justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">$10000</span>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          {hasInvalidItems && (
            <span className="text-sm text-destructive font-medium">
              Please fix invalid items before checkout.
            </span>
          )}
          <Button onClick={handleCheckout} disabled={hasInvalidItems}>
            Checkout
          </Button>
        </div>
      </SheetFooter>
    </SheetContent>
  );
};

export default CartSheetContent;
