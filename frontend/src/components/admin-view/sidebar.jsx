import { ChartNoAxesCombined } from "lucide-react"
import { useNavigate } from "react-router-dom"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import AdminSidebarMenuItems from "./sidebarMenuItems";

const AdminSidebar = ({open, setOpen}) => {
  const navigate = useNavigate();

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r bg-background p-6">
      {/* == Sheet-for mobile devices == */}
      <Sheet open = {open} onOpenChange = {setOpen}>
        <SheetContent side = 'left' className='w-64'>
          <SheetHeader className='border-b'>
            <SheetTitle className='flex items-center gap-2'>
              <ChartNoAxesCombined />
              <span className="text-xl font-extrabold">Clothly Admin</span>
            </SheetTitle>
          </SheetHeader>
          <AdminSidebarMenuItems setOpen = {setOpen}/>
        </SheetContent>
      </Sheet>

      {/* ==== Title ==== */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/admin/dashboard")}
      >
        <ChartNoAxesCombined />
        <h1 className="text-xl font-extrabold">Clothly Admin</h1>
      </div>

      {/* ==== Menu Items ==== */}
      <AdminSidebarMenuItems/>
      
    </aside>
  );
}
export default AdminSidebar