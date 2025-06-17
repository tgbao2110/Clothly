import { LogOut, ShoppingCart, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { DropdownMenuGroup, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "@/store/auth-slice"
import { toast } from "sonner"

const CustomerHeaderActions = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isAuthenticated, user} = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logoutUser()).then(action => {
            if(action?.payload?.success)
                toast.success(action?.payload?.message);
            else
                toast.error(action?.payload?.message);
        })
    }
  return (
    <div className="flex flex-row items-center gap-2">

        {/* ==== Cart ==== */}
        <Button variant='outline' size='icon'>
            <ShoppingCart />
            <span className="sr-only">User cart</span>
        </Button>

        {/* ==== Avatar ==== */}
        <DropdownMenu>
            <DropdownMenuTrigger asChild className='cursor-pointer'>
                <Avatar>
                    <AvatarFallback className="bg-black text-white font-extrabold">
                        {isAuthenticated && user?.userName[0]?.toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-48 mr-2 mt-1'>
                <DropdownMenuLabel>
                    {isAuthenticated && user?.userName}
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup >
                    <DropdownMenuItem className='flex flex-row items-center gap-2 p-2 
                            rounded-sm cursor-pointer hover:bg-accent'
                        onClick={() => navigate('/account')}    
                    >
                        <User size='20px'/>
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='flex flex-row items-center gap-2 p-2
                            rounded-sm cursor-pointer hover:bg-accent text-destructive'
                        onClick={handleLogout}>
                        <LogOut size='20px'/>
                        <span>Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
export default CustomerHeaderActions