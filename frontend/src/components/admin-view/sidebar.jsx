import { ChartNoAxesCombined } from "lucide-react"
import { useNavigate } from "react-router-dom"

const AdminSidebar = () => {
  const navigate = useNavigate();
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

    </aside>
  )
}
export default AdminSidebar