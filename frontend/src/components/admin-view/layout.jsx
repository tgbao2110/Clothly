import { Outlet } from "react-router-dom"

import AdminSidebar from "./sidebar"
import AdminHeader from "./header"

const AdminLayout = () => {
  return (
    <div className="flex flex-row min-h-screen w-full">
        <AdminSidebar/>
        <div className="flex flex-1 flex-col">
            <AdminHeader/>
            <main className="flex flex-1 bg-muted/40 p-4 md:p6">
                HELLO
            </main>
        </div>
    </div>
  )
}
export default AdminLayout