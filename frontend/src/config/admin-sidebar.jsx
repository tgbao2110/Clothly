import { GalleryVertical, Shirt, ShoppingCart, SquareKanban } from "lucide-react";
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
    id: "banners",
    label: "Banners",
    path: "/admin/banners",
    icon: <GalleryVertical size={18}/>
  },
 {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingCart size={18}/>
  },
];