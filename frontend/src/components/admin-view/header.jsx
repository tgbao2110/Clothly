import { useDispatch } from "react-redux"
import { Button } from "../ui/button"
import { LogOut, Menu } from "lucide-react"
import { logoutUser } from "@/store/auth-slice";
import { toast } from "sonner";

const AdminHeader = ({setOpen}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser())
    .then(action => {
      if(action?.payload?.success) {
        toast.success(action?.payload?.message)
      } else {
        toast.error(action?.payload?.message)
      }
    })  
  }
  return (
    <header className="flex justify-between items-center px-4 py-4 bg-background border-b">

      {/* ==== Toggle Menu ==== */}
      <Button className="lg:hidden sm:block" onClick={() => setOpen(true)}>
        <Menu/>
        <span className="sr-only">Menu</span>
      </Button>

      {/* ======= Logout ======= */}
      <div className="flex flex-1 justify-end">
        <Button onClick={handleLogout}>
          <LogOut />
          Logout
        </Button>
      </div>

    </header>
  )
}
export default AdminHeader