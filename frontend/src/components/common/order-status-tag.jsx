import { statusOptions } from "@/config/order";
import { HelpCircle } from "lucide-react";

  const OrderStatusTag = ({status = "unknown"}) => {
    const {  
      label,
      color,
      Icon
    } = statusOptions.find(option => option.value === status) || 
    {
      label: "Unknown",
      color: "text-gray-600",
      Icon: HelpCircle
    };

    return (
      <span className={`flex flex-row items-center ${color}`}>
        <Icon className="size-4 inline-block mr-1"/>
        <span>{label || "Unknown"}</span>
      </span>
    );
  };

  export default OrderStatusTag;