import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";

const HeaderCommon = () => {
  return (
    <div className="flex items-center justify-end">
      <Popover>
        <PopoverTrigger className="flex items-center gap-1 cursor-pointer">
          <span className="rounded-full h-8 w-8 bg-gray-300 flex items-center justify-center">
            <span>RI</span>
          </span>
          <span>
            <ChevronDown />
          </span>
        </PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </Popover>
    </div>
  );
};

export default HeaderCommon;
