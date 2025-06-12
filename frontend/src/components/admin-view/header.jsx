import { Button } from "../ui/button"
import { LogOut, Menu } from "lucide-react"

const AdminHeader = ({setOpen}) => {
  return (
    <header className="flex justify-between items-center px-4 py-4 bg-background border-b">

      {/* ==== Toggle Menu ==== */}
      <Button className="lg:hidden sm:block" onClick={() => setOpen(true)}>
        <Menu/>
        <span className="sr-only">Menu</span>
      </Button>

      {/* ======= Logout ======= */}
      <div className="flex flex-1 justify-end">
        <Button >
          <LogOut />
          Logout
        </Button>
      </div>

    </header>
  )
}
export default AdminHeader