import { ChartNoAxesCombined } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

import { adminSidebarMenuItems } from '@/config'

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r bg-background p-6">

      {/* ==== Title ==== */}
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/admin/dashboard")}
      >
        <ChartNoAxesCombined />
        <h1 className="text-xl font-extrabold">Clothly Admin</h1>
      </div>

      {/* ==== Menu Items ==== */}
      <nav>
        <ul className="mt-7 text-lg ">
        {
          adminSidebarMenuItems.map((item, id) => {
            const isActive = location.pathname.includes(item.path); // set active based on location
            return(
              <li
                key={id} 
                onClick={()=>navigate(item.path)}
                className={`flex items-center h-10 px-5 py-7 gap-2 rounded-md hover:bg-accent 
                cursor-pointer text-muted-foreground hover:text-primary
                ${ isActive && 'text-primary' }
                `}
              >
                {item.icon}
                {item.label}
              </li>
            )
          })
        }
        </ul>
      </nav>
    </aside>
  )
}
export default AdminSidebar