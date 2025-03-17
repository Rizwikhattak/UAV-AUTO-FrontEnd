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
const ViewRoutes = () => {
  const dispatch = useDispatch();
  const routes = [
    {
      id: 1,
      name: "Shamsabad to Rehmanabad station",
      landing_station: "Committee Chowk station",
      departure_station: "Faizabad station",
    },
    {
      id: 2,
      name: "Faizabad to 6th Road station",
      landing_station: "6th Road station",
      departure_station: "Faizabad station",
    },
    {
      id: 3,
      name: "Rehmanabad to Saddar station",
      landing_station: "Saddar station",
      departure_station: "Rehmanabad station",
    },
    {
      id: 4,
      name: "Mureed to Golra station",
      landing_station: "Golra station",
      departure_station: "Mureed station",
    },
    {
      id: 5,
      name: "Shahdara to Lahore station",
      landing_station: "Lahore station",
      departure_station: "Shahdara station",
    },
  ];

  console.log("DROOOONESSSSSSSSSs", routes);
  useEffect(() => {
    dispatch(getAllDrones());
  }, [dispatch]);

  return (
    <section className="view-drones-page flex justify-center">
      <div className="w-full px-10 py-5 space-y-5">
        <div className="header flex flex-col items-center gap-y-4">
          <h1 className="font-medium text-3xl">Routes</h1>
          {/* <p>Manage your routes fleet with Ease View and Edit Drone Details</p> */}
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
          data={routes}
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
      return <span className="ml-4 w-full">{value}</span>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeaderCommon column={column} title="Route Name" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("name");
      return <span className="ml-4 w-full">{value}</span>;
    },
  },
  {
    accessorKey: "landing_station",
    header: ({ column }) => (
      <DataTableColumnHeaderCommon column={column} title="Landing Station" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("landing_station");
      return <span className="ml-4 w-full">{value}</span>;
    },
  },
  {
    accessorKey: "departure_station",
    header: ({ column }) => (
      <DataTableColumnHeaderCommon column={column} title="Departure Station" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("departure_station");
      return <span className="ml-4 w-full">{value}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      // Spread the entire row data for editing/deleting
      const rowData = { ...row.original };
      console.log("Route Data:", rowData);

      return (
        <div className="flex items-center gap-3">
          <EditDroneSheet triggerButton={<Edit />} droneData={rowData} />
          <DeleteDroneDialog triggerButton={<Trash2 />} droneData={rowData} />
          {/* If you have a sheet/dialog for editing a route: */}
          {/* <EditRouteSheet triggerButton={<Edit />} routeData={rowData} /> */}
          {/* If you have a dialog for deleting a route: */}
          {/* <DeleteRouteDialog triggerButton={<Trash2 />} routeData={rowData} /> */}
        </div>
      );
    },
  },
];
export default ViewRoutes;
