import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
  } from "../ui/select";
import { statusOptions } from "@/config/order";

  const OrderStatusTag = ({id, status = "unknown", onChange }) => {

    const [selectedStatus, setSelectedStatus] = useState(status);

    return (
      <Select
        defaultValue={status}
        value={selectedStatus} 
        onValueChange={value => {
          setSelectedStatus(value);
          onChange(id, value);
        }}
      >
        <SelectTrigger
          className={`w-36 
            ${statusOptions.find(({ value }) => value === selectedStatus)?.color}`
          }
        >
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map(({ value, label, Icon, color }) => (
            <SelectItem
              key={value}
              value={value}
              className={` flex items-center gap-1 
                ${color} hover:${color} focus:${color}
              `}
            >
              <Icon className={`size-4 ${color}`} />
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };

  export default OrderStatusTag;