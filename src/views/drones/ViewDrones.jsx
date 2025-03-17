"use client";
import { DataTableColumnHeaderCommon } from "@/components/common/DataTableColumnHeader";
import { DataTableCommon } from "@/components/common/DataTableCommon";
import { DeleteDroneDialog } from "@/components/drone/DeleteDroneDialog";
import { EditDroneSheet } from "@/components/drone/EditDroneSheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getAllDrones } from "@/Store/Actions/droneActions";
import { Trash2 } from "lucide-react";
import { Edit } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const ViewDrones = () => {
  const dispatch = useDispatch();
  const drone = useSelector((state) => state.drone);
  console.log("DROOOONESSSSSSSSSs", drone);
  useEffect(() => {
    dispatch(getAllDrones());
  }, [dispatch]);

  return (
    <section className="view-drones-page flex justify-center">
      <div className="w-full px-10 py-5 space-y-5">
        <div className="header flex flex-col items-center gap-y-4">
          <h1 className="font-medium text-3xl">Drones</h1>
          <p>Manage your drone fleet with Ease View and Edit Drone Details</p>
          {/* <div className="card relative  h-44 w-80 rounded-lg shadow-xl bg-blue-950">
            <Image
              src="/dashboard_drone.png"
              alt=""
              fill
              className="object-cover"
            />
          </div> */}
        </div>
        <DataTableCommon
          columns={tableColumns}
          data={drone.data}
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
        process.env.NEXT_PUBLIC_BASE_URL + row.getValue("image_path")?.slice(2);
      console.log("Image src", imgSrc);
      return (
        <div className="w-20 rounded-md">
          <img
            src={imgSrc}
            alt="drone img"
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
    accessorKey: "speed",
    header: ({ column }) => (
      <DataTableColumnHeaderCommon column={column} title="Speed" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("speed");
      return <span className=" ml-4 w-full">{value}</span>;
    },
  },
  {
    accessorKey: "flight_duration",
    header: ({ column }) => (
      <DataTableColumnHeaderCommon column={column} title="Flight Duration" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("flight_duration");
      return <span className=" ml-4 w-full">{value}</span>;
    },
  },
  {
    accessorKey: "ceiling",
    header: ({ column }) => (
      <DataTableColumnHeaderCommon column={column} title="Ceiling" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("ceiling");
      return <span className=" ml-4 w-full">{value}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const rowData = {
        ...row.original,
        ceiling: String(row.original.ceiling),
        flight_duration: String(row.original.flight_duration),
        fps: String(row.original.fps),
        speed: String(row.original.speed),
        station_id: String(row.original.station_id),
        image_path: `${
          //eslint-disable-next-line no-undef
          process.env.NEXT_PUBLIC_BASE_URL
        }${row.original.image_path?.slice(2)}`,
      };
      console.log("Droneeeee Dataaa", rowData);
      return (
        <div className="flex items-center gap-3">
          {/* <EditDialogOperator
            triggerButton={
              <Edit className="hover:stroke-blue-500 w-4 h-4 cursor-pointer transition-all duration-100 ease-in-out" />
            }
          /> */}
          <EditDroneSheet triggerButton={<Edit />} droneData={rowData} />
          <DeleteDroneDialog triggerButton={<Trash2 />} droneData={rowData} />
        </div>
      );
    },
  },
];
export default ViewDrones;
