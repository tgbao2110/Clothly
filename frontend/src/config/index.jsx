import { GalleryVertical, Shirt, ShoppingCart, SquareKanban } from "lucide-react";
//
//
//
// AUTHENTICATION
//
//// Register
export const registerFormControls = [
  {
    name: "userName",
    label: "Username",
    placeholder: "Enter username",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter password",
    componentType: "input",
    type: "password",
  },
];
//
//// Login
export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter password",
    componentType: "input",
    type: "password",
  },
];
//
//
//
// ADMIN
//
//// Admin Sidebar
export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <SquareKanban size={18}/>
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <Shirt size={18}/>
  },
  {
    id: "features",
    label: "Features",
    path: "/admin/features",
    icon: <GalleryVertical size={18}/>
  },
 {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingCart size={18}/>
  },
];

