import { adminSidebarMenuItems } from '@/config'
import { useLocation, useNavigate } from 'react-router-dom';

const AdminSidebarMenuItems = ({setOpen}) => {

    const navigate = useNavigate();
    const location = useLocation();

  return (
    <nav>
        <ul className="mt-0 lg:mt-7 text-lg ">
          {adminSidebarMenuItems.map((item, id) => {
            const isActive = location.pathname.includes(item.path); // set active based on location
            return (
              <li
                key={id}
                onClick={() => {
                  setOpen?.(false);
                  navigate(item.path);
                }}
                className={`flex items-center h-10 px-5 py-7 gap-2 rounded-md hover:bg-accent 
                  cursor-pointer text-muted-foreground hover:text-primary
                  ${isActive && "text-primary"}
                `}
              >
                {item.icon} 
                {item.label}
              </li>
            );
          })}
        </ul>
      </nav>
  )
}
export default AdminSidebarMenuItems