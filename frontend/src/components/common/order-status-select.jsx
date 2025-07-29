import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
  } from "../ui/select";
import { statusOptions } from "@/config/order";

  const OrderStatusSelect = ({id, status = "unknown", onChange }) => {

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
              className={` flex items-start
                ${color} hover:${color} focus:${color}
              `}
            >
              <Icon className={`size-3.75 ${color}`} />
              <span>{label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };

  export default OrderStatusSelect;