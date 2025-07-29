import OrderDetails from "@/components/common/order-details";
import OrderStatusTag from "@/components/common/order-status-tag";
import UserInfo from "@/components/common/user-info";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAllOrders, setOrderStatus } from "@/store/order-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order.allOrders);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Fetch orders
  useEffect(() => {
    dispatch(getAllOrders())
    .then(action => {
      if(!action?.payload?.success)
        toast.error(action?.payload?.message);
    })
  },[])

  // Handle status change
  const handleStatusChange = (orderId, status) => {
    console.log("handleStatusChange CALLED")
    dispatch(setOrderStatus({ orderId, status }))
    .then(action => {
      if(action?.payload?.success)
        toast.success(action?.payload?.message);
      else
        toast.error(action?.payload?.message);
    })
  }

  return (
    <div className="w-full mx-auto">
      <Table className="2xl:min-w-[1200px] xl:min-w-[1000px] lg:min-w-[800px]">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden sm:table-cell">No</TableHead>
            <TableHead>User</TableHead>
            <TableHead className="hidden md:table-cell">Address</TableHead>
            <TableHead className="hidden md:table-cell">Products</TableHead>
            <TableHead className="hidden lg:table-cell">Total Price</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            orders.map((order, i) => (
              <TableRow key={order._id}>
                <TableCell className="hidden sm:table-cell">
                  {i+1}
                </TableCell>
                {/* ---------------- */}
                <TableCell>
                  <UserInfo user={order.user} hideAvatar/>
                </TableCell>
                {/* ---------------- */}
                <TableCell className="hidden md:table-cell">
                  {order.address.address}
                </TableCell>
                {/* ---------------- */}
                <TableCell className="hidden md:table-cell">
                  {order.items.length}
                </TableCell>
                {/* ---------------- */}
                <TableCell className="hidden lg:table-cell">
                  $ {order.totalPrice.toFixed(2)}
                </TableCell>
                {/* ---------------- */}
                <TableCell className="hidden md:table-cell">
                  {order.createdAt.split("T")[0].split("-").reverse().join("-")}
                </TableCell>
                {/* ---------------- */}
                <TableCell>
                  <OrderStatusTag
                    status={order.status}
                  />
                </TableCell>
                {/* ---------------- */}
                <TableCell className="text-right">
                  <Button variant="link"
                    className="hover:underline"
                    onClick={() => {
                      setCurrentOrder(order);
                      setIsSheetOpen(true);
                    }}
                  >
                    {'Details >'}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      
      <OrderDetails 
        isOpen={isSheetOpen}
        setIsOpen={setIsSheetOpen}
        order={currentOrder}
        onStatusChange={handleStatusChange}
      />

    </div>
  )
}
export default AdminOrders