"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Import your Zod schema for missions
import { addMissionSchema } from "../PlanMissionSchema";

// shadcn/ui + custom components
import { Form } from "../../../components/ui/form";
import InputCommon from "../../../components/common/InputCommon";
import SelectCommon from "../../../components/common/SelectCommon";
import { Button } from "../../../components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Spinner from "@/components/common/SpinnerCommon";

// Redux stuff
import { useSelector, useDispatch } from "react-redux";
// Example actions to fetch data
import { getAllStations } from "@/Store/Actions/stationActions";
import { getAllDrones } from "@/Store/Actions/droneActions";
import { getAllOperators } from "@/Store/Actions/operatorActions";
import { addMissionPlan } from "@/Store/Actions/planMissionActions";
import { DateTimePickerCommon } from "@/components/common/DateTimePickerCommon";

export default function AddMissionPage() {
  const dispatch = useDispatch();
  console.log("CAAAAALLLLLEEEEED");
  // Example: Suppose you have slices for station, drone, operator
  const station = useSelector((state) => state.station);
  const droneState = useSelector((state) => state.drone);
  const operatorState = useSelector((state) => state.operator);
  const mission = useSelector((state) => state.planMission);

  // Example initial form values
  let initialState = {
    name: "",
    departure_station_id: "",
    landing_station_id: "",
    start_date: "",
    start_time: "",
    status: "not set",
    drone_id: "",
    operator_id: "",
  };

  // Setup React Hook Form with the mission schema
  const form = useForm({
    resolver: zodResolver(addMissionSchema),
    defaultValues: initialState,
  });

  // Fetch any data you need for dropdowns
  useEffect(() => {
    dispatch(getAllStations());
    dispatch(getAllDrones());
    dispatch(getAllOperators());
  }, [dispatch]);

  // Submit handler
  const handleFormSubmit = async (data) => {
    try {
      console.log("Mission Form Submitted:", data);
      // If your API expects FormData, create it:
      // const formData = new FormData();
      // Object.entries(data).forEach(([key, value]) => {
      //   formData.append(key, value);
      // });
      // await dispatch(addMissionPlan(formData)).unwrap();

      // Otherwise, if a simple JSON POST is fine:
      data.admin_id = 1;
      await dispatch(addMissionPlan(JSON.stringify(data))).unwrap();
      // Then reset to your initial form defaults
      form.reset({
        name: "",
        departure_station_id: "",
        landing_station_id: "",
        start_date: "",
        start_time: "",
        status: "not set",
        drone_id: "",
        operator_id: "",
      });

      // initialState = { ...initialState };
    } catch (err) {
      console.log("Error adding mission:", err);
    }
  };

  const handleError = (errors) => {
    console.log("Validation Errors:", errors);
  };

  return (
    <div className="flex justify-center p-10 bg-[--color-avocado-100]">
      <div className="flex  flex-col w-[70%] gap-4">
        <div className="content-header text-center">
          <h1 className="text-xl font-bold">Add New Mission</h1>
          <p>Plan and schedule your next mission efficiently.</p>
        </div>

        <Form {...form} className="w-full">
          <form
            onSubmit={form.handleSubmit(handleFormSubmit, handleError)}
            className="space-y-4"
          >
            {/* Mission Name */}
            <InputCommon
              control={form.control}
              name="name"
              label="Mission Name"
              placeholder="Enter mission name"
            />

            {/* Departure Station */}
            {station.loading ? (
              <Skeleton className="h-9 w-full" />
            ) : (
              <SelectCommon
                control={form.control}
                name="departure_station_id"
                label="Departure Station"
                items={station.data} // e.g., { id, name } objects
                placeholder="Select departure station"
              />
            )}

            {/* Landing Station */}
            {station.loading ? (
              <Skeleton className="h-9 w-full" />
            ) : (
              <SelectCommon
                control={form.control}
                name="landing_station_id"
                label="Landing Station"
                items={station.data} // same or different data as needed
                placeholder="Select landing station"
              />
            )}

            <DateTimePickerCommon control={form.control} name="start_date" />
            {/* Drones */}
            {droneState.loading ? (
              <Skeleton className="h-9 w-full" />
            ) : (
              <SelectCommon
                control={form.control}
                name="drone_id"
                label="Drones"
                items={droneState.data} // e.g., { id, name } objects
                placeholder="Select drone"
              />
            )}

            {/* Operator */}
            {operatorState.loading ? (
              <Skeleton className="h-9 w-full" />
            ) : (
              <SelectCommon
                control={form.control}
                name="operator_id"
                label="Operator"
                items={operatorState.data} // e.g., { id, name } objects
                placeholder="Assign to operator"
              />
            )}

            <Button
              type="submit"
              variant={mission.loading ? "outline-full" : "hover-blue-full"}
              disabled={mission.loading}
            >
              {mission.loading ? <Spinner /> : "Add Mission"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
