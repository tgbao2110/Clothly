import UserInfo from "./user-info"
import AddressCard from "../customer-view/account/adressCard"
import CartItem from "../customer-view/cart/cart-item"
import { Separator } from "../ui/separator"
import { Sheet, SheetHeader, SheetContent, SheetDescription, SheetTitle } from "../ui/sheet"
import OrderStatusSelect from "./order-status-select"

const OrderDetails = ({isOpen, setIsOpen, order, onStatusChange}) => {
  if (!order) return null;
  const {
    _id: id,
    user,
    address,
    items,
    totalPrice,
    createdAt,
    status,
  } = order

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="pb-5 overflow-auto">
        <SheetHeader className='border-b'>
          <SheetTitle>Order Details</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className='flex flex-col px-4 gap-5'>
          <div className="flex flex-row items-center gap-3">
            <h2 className="text-lg font-bold">Status:</h2>
            <OrderStatusSelect id={id} status={status} onChange={onStatusChange} />
          </div>
          <Separator/>
          <UserInfo user={user} />
          <AddressCard address={address} />
          <div className="text-sm text-muted-foreground italic">
            <p>
              Ordered at:
              {new Date(createdAt).toLocaleString().split(",").reverse().join(", ")}
            </p>
            <p>{address.notes && `Notes: ${address.notes}`}</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold">Items</h2>
            <Separator/>
            <div>
              {
                items.map((item,i) => (
                  <CartItem key={i} item={item} readOnly />
                ))
              }
            </div>
            <div className="flex justify-between font-bold text-lg md:border-t pt-4">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default OrderDetails