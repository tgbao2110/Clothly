import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getOrdersByUser } from "@/store/order-slice";
import OrderStatusTag from "@/components/common/order-status-tag";
import OrderDetails from "@/components/common/order-details";

const AccountOrders = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user.id);
  const orders = useSelector(state => state.order.customerOrders);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    dispatch(getOrdersByUser(userId))
    .then(action => {
      console.log(action.payload)
      if(!action.payload.success)
        toast.error(action.payload?.message);
    }) 
  }, [])

  return (
    <Card>
      <CardContent>
        <Table>
          <TableBody>
            {
              orders.map((order,i) => 
                <TableRow key={i}>
                  <TableCell className="flex flex-row items-center gap-5 min-h-[60px]">
                    <img
                      src={order.items[0].product.image} 
                      alt={order.items[0].product.title} 
                      className="hidden sm:block size-15 rounded-md"
                    />
                    <div className="flex flex-col gap-1 text-muted-foreground text-sm">
                      {
                        order.items.slice(0,2).map((item, i) => 
                          <p key={i}>{item.qty} x {item.product.title}</p>
                        )
                      }
                      {
                        order.items.length > 2 && (
                          <p>...</p>
                        )
                      }
                    </div>
                  </TableCell>

                  <TableCell className='text-sm text-muted-foreground hidden sm:table-cell'>
                    <p>
                      {order.createdAt.split("T")[1].split(".")[0].split(':')[0]}
                      :{order.createdAt.split("T")[1].split(".")[0].split(':')[1]}
                    </p>
                    <p>
                      {order.createdAt.split("T")[0]}
                    </p>
                  </TableCell>

                  <TableCell>
                    <OrderStatusTag status={order.status}/>
                  </TableCell>

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
              )
            }
          </TableBody>
        </Table>
      </CardContent>

      <OrderDetails 
        isOpen={isSheetOpen}
        setIsOpen={setIsSheetOpen}
        order={currentOrder} 
      />
    </Card>
  )
}
export default AccountOrders