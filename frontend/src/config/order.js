  import {
    CheckCircle2,
    Clock,
    HelpCircle,
    Truck,
    XCircle
  } from "lucide-react";

export const statusOptions = [
    { value: "pending", label: "Pending", color: "text-yellow-500", Icon: Clock },
    { value: "delivered", label: "Delivered", color: "text-green-600", Icon: CheckCircle2 },
    { value: "delivering", label: "Delivering", color: "text-blue-500", Icon: Truck },
    { value: "canceled", label: "Canceled", color: "text-red-500", Icon: XCircle },
    { value: "unknown", label: "Unknown", color: "text-gray-600", Icon: HelpCircle },
  ];