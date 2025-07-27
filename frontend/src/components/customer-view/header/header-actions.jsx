import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import { LogOut, ShoppingCart, User } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuGroup,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { logoutUser } from "@/store/auth-slice"
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import CartSheetContent from "../cart/cart";
import { useState } from "react";

const CustomerHeaderActions = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isAuthenticated, user} = useSelector(state => state.auth);
    const cartCount = useSelector(state => state.cart.itemsCount);

    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logoutUser()).then(action => {
            if(action?.payload?.success)
                toast.success(action?.payload?.message);
            else
                toast.error(action?.payload?.message);
        })
    }
  return (
    <div className="flex flex-row items-center gap-3">
      {/* ==== Cart ==== */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart />
            <span className="sr-only">User cart</span>
            {cartCount > 0 && (
              <div
                className="flex justify-center items-center rounded-full
                                absolute h-5 w-5 z-50 bottom-6 left-6
                                text-[11px] bg-primary text-background"
              >
                <p>{cartCount < 10 ? cartCount : "9+"}</p>
              </div>
            )}
          </Button>
        </SheetTrigger>
        <CartSheetContent isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>
      </Sheet>

      {/* ==== Avatar ==== */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Avatar>
            <AvatarFallback className="bg-black text-white font-medium">
              {isAuthenticated && user?.userName[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 mr-2 mt-1">
          <DropdownMenuLabel>
            {isAuthenticated && user?.userName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="py-2"
              onClick={() => navigate("/account")}
            >
              <User size="20px" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2" onClick={handleLogout}>
              <LogOut size="20px" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
export default CustomerHeaderActions