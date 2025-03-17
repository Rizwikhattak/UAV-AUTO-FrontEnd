"use client";
import { DataTableColumnHeaderCommon } from "@/components/common/DataTableColumnHeader";
import { DataTableCommon } from "@/components/common/DataTableCommon";
import { DeleteDroneDialog } from "@/components/drone/DeleteDroneDialog";
import { EditDroneSheet } from "@/components/drone/EditDroneSheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getAllDrones } from "@/Store/Actions/droneActions";
import { getAllStations } from "@/Store/Actions/stationActions";
import { Trash2 } from "lucide-react";
import { Edit } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const ViewStations = () => {
  const dispatch = useDispatch();
  const station = useSelector((state) => state.station);
  console.log("DROOOONESSSSSSSSSs", station);
  useEffect(() => {
    dispatch(getAllStations());
  }, [dispatch]);

  return (
    <section className="view-drones-page flex justify-center">
      <div className="w-full px-10 py-5 space-y-5">
        <div className="header flex flex-col items-center gap-y-4">
          <h1 className="font-medium text-3xl">Stations</h1>
          {/* <p>Manage your station fleet with Ease View and Edit Drone Details</p> */}
          <div className="card relative  h-44 w-80 rounded-lg shadow-xl bg-blue-950">
            <Image src="/map.jpg" alt="" fill className="object-cover" />
          </div>
        </div>
        <DataTableCommon
          columns={tableColumns}
          data={station.data}
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
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeaderCommon column={column} title="ID" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("id");
      return <span className=" ml-4 w-full">{value}</span>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeaderCommon column={column} title="Station Name" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("name");
      return <span className=" ml-4 w-full">{value}</span>;
    },
  },
  {
    accessorKey: "num_drones",
    header: ({ column }) => (
      <DataTableColumnHeaderCommon column={column} title="No. of Drones" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("num_drones");
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
export default ViewStations;
