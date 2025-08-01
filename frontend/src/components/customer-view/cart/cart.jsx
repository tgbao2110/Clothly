import { useEffect, useState } from "react";
import {
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../ui/button";
import CartItem from "./cart-item";
import { deleteAllItems, setNeedsUpdate, updateCart } from "@/store/customer-slices/cart-slice";
import { useNavigate } from "react-router-dom";

const CartSheetContent = ({isCartOpen, setIsCartOpen}) => {
  const dispatch = useDispatch();
  const navigate  = useNavigate();
  //
  const userId = useSelector(state => state.auth.user.id);
  const needsUpdate = useSelector(state => state.cart.needsUpdate);
  const currentItems = useSelector(state => state.cart.items); // Global state
  const [items, setItems] = useState(currentItems); // Updated state
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
  // Handle Update when sheet closed
  useEffect(() => {
    if (!isCartOpen && items.length > 0) {
      dispatch(updateCart({userId, items}))
    }
    if (!isCartOpen && items.length <= 0) {
      dispatch(deleteAllItems(userId))
    }
    dispatch(setNeedsUpdate(false));
  }, [isCartOpen])
  //
  // Total Price
  const totalPrice = items.reduce((sum, item) => {
    return sum + item.product.salePrice*item.qty;
  },0)
  //
  // Handle Checkout
  const handleCheckout = () => {
    dispatch(updateCart({userId, items}))
    .then(() => {
      navigate(`/checkout`);
      setIsCartOpen(false);
    })
  };
  
  return (
    <SheetContent className="flex flex-col h-full p-0">
      <SheetHeader className="border-b">
        <SheetTitle>My Cart</SheetTitle>
      </SheetHeader>

      <div className="flex flex-col w-full gap-4 overflow-y-auto">
        {items.map((item,i) => (
          <CartItem
            key={i}
            item={item}
            onQtyChange={handleQtyChange}
            onDelete={handleDeleteItem}
          />
        ))}
      </div>

    {
      items.length > 0 &&
      <SheetFooter className="sticky bottom-0 border-t px-4 py-4 z-10">
        <div className="space-y-4">
          <div className="flex flex-row justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">${totalPrice.toFixed(2)}</span>
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
    }
    </SheetContent>
  );
};

export default CartSheetContent;
