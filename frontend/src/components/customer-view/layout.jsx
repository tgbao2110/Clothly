import { Outlet } from "react-router-dom"

import CustomerHeader from "./header"
import CustomerFooter from "./footer"

const CustomerLayout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
        <CustomerHeader/>
        <main className="flex flex-col w-full min-h-[calc(100vh_-_64px)]">
            <Outlet/>
        </main>
        <CustomerFooter/>
    </div>
  )
}
export default CustomerLayout