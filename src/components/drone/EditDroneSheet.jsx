"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";

import { updateDrone } from "@/Store/Actions/droneActions"; // <-- Replace with your actual action
import { addDroneSchema } from "@/app/drones/DroneSchema"; // <-- Replace with your actual Zod schema

import CardInputCommon from "@/components/common/CardInputCommon";
import InputCommon from "@/components/common/InputCommon";
import Spinner from "@/components/common/SpinnerCommon";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SelectCommon from "@/components/common/SelectCommon";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllStations } from "@/Store/Actions/stationActions";

export function EditDroneSheet({ triggerButton, droneData }) {
  // Example: if your Redux slice is named `drone`
  const droneState = useSelector((state) => state.drone);
  const station = useSelector((state) => state.station);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  // Initial state for a drone
  const initialState = {
    name: droneData.name,
    speed: droneData.speed,
    flight_duration: droneData.flight_duration,
    ceiling: droneData.ceiling,
    fps: droneData.fps,
    station_id: droneData.station_id,
    image: droneData.image_path, // or droneData.image if that’s your key
  };

  const form = useForm({
    resolver: zodResolver(addDroneSchema), // <-- Use your drone schema
    defaultValues: initialState,
  });
  useEffect(() => {
    dispatch(getAllStations());
  }, [dispatch]);
  const handleFormSubmit = async (data) => {
    try {
      console.log("Form Submitted:", data);

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        key !== "name" && key !== "image"
          ? formData.append(key, Number(value))
          : formData.append(key, value);
      });

      // If you need an ID for updating on the backend:
      formData.append("id", Number(droneData.id));
      // console.log("FPPPPPPRRRRRRRR", formData.getAll());
      // 1. Loop through each entry
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      dispatch(updateDrone(formData));
    } catch (err) {
      console.log("Error updating drone:", err);
      toast.error("Error updating drone. Please try again.");
    }
  };

  const handleError = (errors) => {
    console.log("Validation Errors:", errors);
    toast.error("Please fix the errors before submitting.");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          onClick={() => setOpen(true)}
          className="hover:text-blue-500 w-4 h-4 cursor-pointer transition-all duration-100 ease-in-out"
        >
          {triggerButton}
        </Button>
      </SheetTrigger>
      <SheetContent className="h-screen overflow-y-auto p-5">
        <SheetHeader>
          <SheetTitle>Edit Drone</SheetTitle>
          <SheetDescription>
            Make changes to your drone here. Click save when you’re done.
          </SheetDescription>
        </SheetHeader>

        <Form {...form} className="w-full">
          <form
            onSubmit={form.handleSubmit(handleFormSubmit, handleError)}
            className="space-y-4"
          >
            {/* Image Upload */}
            <CardInputCommon control={form.control} name="image" />
            {/* Drone Name */}
            <InputCommon
              control={form.control}
              name="name"
              label="Drone Name"
              placeholder="Enter drone name"
            />

            {/* Speed */}
            <InputCommon
              control={form.control}
              name="speed"
              inputType="text"
              label="Speed (km/h)"
              placeholder="Enter drone speed"
            />

            {/* Flight Duration */}
            <InputCommon
              control={form.control}
              name="flight_duration"
              inputType="text"
              label="Flight Duration (hrs)"
              placeholder="Enter flight duration"
            />

            {/* Ceiling */}
            <InputCommon
              control={form.control}
              name="ceiling"
              inputType="text"
              label="Ceiling (m)"
              placeholder="Enter maximum altitude"
            />

            {/* FPS */}
            <InputCommon
              control={form.control}
              name="fps"
              inputType="text"
              label="FPS"
              placeholder="Enter camera FPS"
            />

            {/* Station ID */}
            {station.loading ? (
              <Skeleton className="h-9 w-full" />
            ) : (
              <SelectCommon
                control={form.control}
                name="station_id"
                label="Stations"
                items={station.data}
                placeholder="Please select a station"
              />
            )}

            <SheetFooter className="!p-0">
              <SheetClose asChild>
                <Button
                  type="submit"
                  disabled={droneState.loading}
                  onClick={() => setOpen(false)}
                  variant={
                    droneState.loading ? "outline-full" : "hover-blue-full"
                  }
                >
                  {droneState.loading ? <Spinner /> : "Update Drone"}
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
