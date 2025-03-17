"use client";
import React, { useEffect, useState } from "react";
import "../../app/globals.css";
import { Card, CardContent } from "../../components/ui/card";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../components/ui/form";
import InputCommon from "../../components/common/InputCommon";
import CardInputCommon from "../../components/common/CardInputCommon";
import { Button } from "../../components/ui/button";
import SelectCommon from "@/components/common/SelectCommon";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllStations } from "@/Store/Actions/stationActions";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { addDrone } from "@/Store/Actions/droneActions";
import Spinner from "@/components/common/SpinnerCommon";
import Link from "next/link";
import { addRouteSchema } from "@/views/routes/RoutesSchema";
import Image from "next/image";
const AddRoutes = () => {
  const drone = useSelector((state) => state.drone);
  const dispatch = useDispatch();
  const [inputImage, setInputImage] = useState(null);
  const station = useSelector((state) => state.station);
  console.log("Stationnnnnnnnnnnnnnnn:", station);
  const initialState = {
    name: "",
    speed: "",
    flight_duration: "",
    ceiling: "",
    fps: "",
    station_id: "",
    image: "",
  };

  const form = useForm({
    resolver: zodResolver(addRouteSchema),
    defaultValues: initialState,
  });

  useEffect(() => {
    dispatch(getAllStations());
  }, [dispatch]);
  console.log("Stations", station);

  const handleFormSubmit = async (data) => {
    try {
      console.log("Form Submitted:", data);
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      await dispatch(addDrone(formData)).unwrap();
      form.reset();
    } catch (err) {
      console.log(err);
    }
  };

  const handleError = (errors) => {
    console.log("Validation Errors:", errors);
  };

  return (
    <div className="flex justify-center p-10 bg-[--color-avocado-100]">
      <div className="flex flex-col w-[70%] gap-4">
        <div className="content-header text-center">
          <h1 className="text-xl font-bold">Add Route</h1>

          {/* <p>Configure and Deploy Your Drone for Optimal Mission Performance</p> */}
        </div>
        <Form {...form} className="w-full">
          <form
            onSubmit={form.handleSubmit(handleFormSubmit, handleError)}
            className="space-y-4"
          >
            {/* <CardInputCommon control={form.control} /> */}
            <InputCommon
              control={form.control}
              name="name"
              label="Name"
              placeholder="Enter Route name"
            />

            {station.loading ? (
              <Skeleton className="h-9 w-full" />
            ) : (
              <SelectCommon
                control={form.control}
                name="station_id"
                label="Stations"
                items={station.data}
                placeholder="Select departure station"
              />
            )}
            {station.loading ? (
              <Skeleton className="h-9 w-full" />
            ) : (
              <SelectCommon
                control={form.control}
                name="station_id"
                label="Stations"
                items={station.data}
                placeholder="Select landing station"
              />
            )}
            <div className="card relative  h-44 w-80 rounded-lg shadow-xl bg-blue-950">
              <Image src="/map.jpg" alt="" fill className="object-cover" />
            </div>
            <div className="text-[var(--primary-custom)]  flex items-center gap-2 w-full">
              <span>
                <Image
                  width={15}
                  height={15}
                  src="/Location.png"
                  alt="Location"
                />
              </span>
              <span>Choose on map</span>
            </div>
            <Button
              type="submit"
              variant={drone.loading ? "outline-full" : "hover-blue-full"}
              disabled={drone.loading}
            >
              {drone.loading ? <Spinner /> : "Add Route"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
const stationDropDownItems = [
  {
    name: "Shamsabad Station",
    value: "shamsabadStation",
  },
  {
    name: "Rehmanabad Station",
    value: "rehmanabadStation",
  },
  {
    name: "6th Road Station",
    value: "sixthRoadStation",
  },
];
export default AddRoutes;
