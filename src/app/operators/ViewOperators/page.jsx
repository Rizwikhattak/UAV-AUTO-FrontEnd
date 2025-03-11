"use client";
import { DataTableColumnHeaderCommon } from "@/components/common/DataTableColumnHeader";
import { DataTableCommon } from "@/components/common/DataTableCommon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllDrones } from "@/Store/Actions/droneActions";
import { getAllOperators } from "@/Store/Actions/operatorActions";
import { Delete } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Edit } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const page = () => {
  const dispatch = useDispatch();
  const operator = useSelector((state) => state.operator);
  console.log("DROOOONESSSSSSSSSs", operator);
  useEffect(() => {
    dispatch(getAllOperators());
  }, [dispatch]);
  return (
    <section className="view-drones-page flex justify-center">
      <div className="w-full px-10 py-5 space-y-5">
        <div className="header flex flex-col items-center gap-y-2">
          <h1 className="font-medium text-3xl">Operators</h1>
          <p>Manage your team, View all drone operators</p>
          <div className="card relative  h-44 w-80 rounded-lg shadow-xl">
            <Image
              src="/AddDrone.png"
              alt=""
              fill
              className="object-cover w-72"
            />
          </div>
        </div>
        <DataTableCommon
          columns={tableColumns}
          data={operator.data}
          className="w-full"
        />
      </div>
    </section>
  );
};
const tableColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image_path",
    header: "Image",
    cell: ({ row }) => {
      const imgSrc =
        //eslint-disable-next-line no-undef
        process.env.NEXT_PUBLIC_BASE_URL + row.getValue("image_path");
      console.log("Image src", imgSrc);
      return (
        <div className="w-20 rounded-md">
          <img
            src={imgSrc}
            alt="operator img"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeaderCommon column={column} title="Drone Name" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("name");
      return <span className=" ml-4 w-full">{value}</span>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeaderCommon column={column} title="email" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("email");
      return <span className=" ml-4 w-full">{value}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <div className="flex items-center gap-3">
        
          <Edit className="hover:stroke-blue-500 w-4 h-4 cursor-pointer transition-all duration-100 ease-in-out" />
          <Trash2 className="hover:stroke-red-500 w-4 h-4 cursor-pointer transition-all duration-100 ease-in-out" />
        </div>
      );
    },
  },
];
export default page;
