import { customerHeaderMenuItems } from "@/config"
import { Link } from "react-router-dom"

const CustomerHeaderMenuItems = () => {
  return (
    <nav className="flex flex-col mb-3 px-4 gap-5 
      lg:flex-row lg:mb-0 lg:items-center lg:px-0 lg:gap-7
      font-semibold"
    >
        {
            customerHeaderMenuItems.map(item => (
                <Link key={item.id} to={item.path}>
                    {item.label}
                </Link>
            ))
        }
    </nav>
  )
}
export default CustomerHeaderMenuItems