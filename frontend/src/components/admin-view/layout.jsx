import { useState } from "react"
import { Outlet } from "react-router-dom"

import AdminSidebar from "./sidebar"
import AdminHeader from "./header"

const AdminLayout = () => {

  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex flex-row min-h-screen w-full">
        <AdminSidebar open = {openSidebar} setOpen={setOpenSidebar}/>
        <div className="flex flex-1 flex-col">
            <AdminHeader setOpen={setOpenSidebar}/>
            <main className="flex flex-1 bg-muted/40 p-4 md:p6">
                <Outlet/>
            </main>
        </div>
    </div>
  )
}
export default AdminLayout