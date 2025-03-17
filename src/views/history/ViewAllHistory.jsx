"use client";
import { DataTableColumnHeaderCommon } from "@/components/common/DataTableColumnHeader";
import { DataTableCommon } from "@/components/common/DataTableCommon";
import { DeleteDroneDialog } from "@/components/drone/DeleteDroneDialog";
import { EditDroneSheet } from "@/components/drone/EditDroneSheet";
// Update these imports to your mission plan-specific components if available
// import { DeleteMissionPlanDialog } from "@/components/missionPlan/DeleteMissionPlanDialog";
// import { EditMissionPlanSheet } from "@/components/missionPlan/EditMissionPlanSheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { Edit } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const ViewAllHistory = () => {
  const dispatch = useDispatch();

  // Dummy mission plan data with two statuses: "not set" and "active"
  const history = [
    {
      id: 1,
      name: "Rawalpindi Surveillance",
      route_name: "Shamsabad to Rehmanabad route",
      landing_station: "Committee Chowk station",
      departure_station: "Faizabad station",
      drone_name: "Falcon X",
      status: "not set",
      description:
        "A comprehensive surveillance mission covering strategic areas in Rawalpindi.",
      start_date: "2025-01-15",
      end_date: "2025-01-15",
      duration: "3 hours",
    },
    {
      id: 2,
      name: "Lahore Recon",
      route_name: "Mall to Clock Tower route",
      landing_station: "Liberty Market station",
      departure_station: "Clock Tower station",
      drone_name: "Falcon X",
      status: "active",
      description:
        "Recon mission mapping key landmarks and urban infrastructure in Lahore.",
      start_date: "2025-02-10",
      end_date: "2025-02-10",
      duration: "2 hours",
    },
    {
      id: 3,
      name: "Islamabad Patrol",
      route_name: "G-9 to Blue Area route",
      landing_station: "G-9 station",
      departure_station: "Blue Area station",
      drone_name: "Eagle Eye",
      status: "active",
      description:
        "Patrol mission to enhance security around government and business districts.",
      start_date: "2025-03-05",
      end_date: "2025-03-05",
      duration: "4 hours",
    },
    {
      id: 4,
      name: "Faisalabad Security",
      route_name: "D Ground to Satellite Town route",
      landing_station: "D Ground station",
      departure_station: "Satellite Town station",
      drone_name: "Falcon X",
      status: "not set",
      description:
        "Security operation monitoring industrial zones and urban outskirts.",
      start_date: "2025-04-20",
      end_date: "2025-04-20",
      duration: "5 hours",
    },
    {
      id: 5,
      name: "Multan Monitoring",
      route_name: "Clock Tower to Shujabad route",
      landing_station: "Clock Tower station",
      departure_station: "Shujabad station",
      drone_name: "Hawk Eye",
      status: "active",
      description:
        "Monitoring mission assessing traffic flow and urban development in Multan.",
      start_date: "2025-05-15",
      end_date: "2025-05-15",
      duration: "3.5 hours",
    },
    {
      id: 6,
      name: "Peshawar Recon",
      route_name: "Qissa Khawani Bazaar to Saddar route",
      landing_station: "Qissa Khawani station",
      departure_station: "Saddar station",
      drone_name: "Falcon X",
      status: "not set",
      description:
        "Reconnaissance mission exploring historical markets and urban layouts in Peshawar.",
      start_date: "2025-06-10",
      end_date: "2025-06-10",
      duration: "2.5 hours",
    },
  ];

  // If you plan to fetch mission plans from a store or API, dispatch that action here.
  // For now, we're using dummy data.
  useEffect(() => {
    // dispatch(getAllMissionPlans());
  }, [dispatch]);

  return (
    <section className="view-mission-plans-page flex justify-center">
      <div className="w-full px-10 py-5 space-y-5">
        <div className="header flex flex-col items-center gap-y-4">
          <h1 className="font-medium text-3xl">Mission History</h1>
          {/* <p>
            Manage your mission plans with ease. View and edit mission plan
            details below.
          </p> */}
          {/* Uncomment and update if you want to display an image:
          <div className="card relative h-44 w-80 rounded-lg shadow-xl bg-blue-950">
            <Image
              src="/dashboard_mission.png"
              alt="Mission Plans Dashboard"
              fill
              className="object-cover"
            />
          </div>
          */}
        </div>
        <DataTableCommon
          columns={tableColumns}
          data={history}
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
      <DataTableColumnHeaderCommon column={column} title="Mission Plan Name" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("name");
      return <span className="ml-4 w-full">{value}</span>;
    },
  },
  {
    accessorKey: "route_name",
    header: ({ column }) => (
      <DataTableColumnHeaderCommon column={column} title="Route Name" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("route_name");
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
    accessorKey: "drone_name",
    header: ({ column }) => (
      <DataTableColumnHeaderCommon column={column} title="Drone Name" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("drone_name");
      return <span className="ml-4 w-full">{value}</span>;
    },
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => (
      <DataTableColumnHeaderCommon column={column} title="Start date" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("drone_name");
      return <span className="ml-4 w-full">{value}</span>;
    },
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => (
      <DataTableColumnHeaderCommon column={column} title="End Date" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("end_date");
      return <span className="ml-4 w-full">{value}</span>;
    },
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeaderCommon column={column} title="Duration" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("duration");
      return <span className="ml-4 w-full">{value}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeaderCommon column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("status");
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
      console.log("Mission Plan Data:", rowData);

      return (
        <div className="flex items-center gap-3">
          <EditDroneSheet triggerButton={<Edit />} droneData={rowData} />
          <DeleteDroneDialog triggerButton={<Trash2 />} droneData={rowData} />
          {/* <EditMissionPlanSheet
            triggerButton={<Edit />}
            missionPlanData={rowData}
          />
          <DeleteMissionPlanDialog
            triggerButton={<Trash2 />}
            missionPlanData={rowData}
          /> */}
        </div>
      );
    },
  },
];

export default ViewAllHistory;
