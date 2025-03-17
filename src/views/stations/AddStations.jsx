"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { addOperator } from "@/Store/Actions/operatorActions";
import { addOperatorSchema } from "@/views/operators/OperatorsSchema";
import { useSelector } from "react-redux";
import Spinner from "@/components/common/SpinnerCommon";
import { MapSearchComboboxCommon } from "@/components/common/MapSearchComboboxCommon";
import { MapComponent } from "@/components/common/MapComponent";
import CardInputCommon from "@/components/common/CardInputCommon";
import { Form } from "@/components/ui/form";
import InputCommon from "@/components/common/InputCommon";
import { Button } from "@/components/ui/button";

const AddStation = () => {
  const operator = useSelector((state) => state.operator);
  const dispatch = useDispatch();
  const [inputImage, setInputImage] = useState(null);

  const initialState = {
    name: "",
    location: "",
    lat: 0,
    lng: 0,
  };

  const form = useForm({
    resolver: zodResolver(addOperatorSchema),
    defaultValues: initialState,
    mode: "onChange",
  });

  const handleFormSubmit = async (data) => {
    try {
      console.log("Form Submitted:", data);

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("role", "operator");
      await dispatch(addOperator(formData)).unwrap();
      form.reset();
    } catch (err) {
      console.log(err);
    }
  };

  const handleError = (errors) => {
    console.log("Validation Errors:", errors);
    toast.error("Please fix the errors before submitting.");
  };

  return (
    <div className="flex justify-center p-10 h-full">
      <div className="flex flex-col w-[70%] gap-4">
        <div className="content-header text-center">
          <h1 className="text-xl font-bold">Add New Station</h1>
          {/* <p>Register an operator to manage drone operations efficiently</p> */}
        </div>
        <Form {...form} className="w-full">
          <form
            onSubmit={form.handleSubmit(handleFormSubmit, handleError)}
            className="space-y-4"
          >
            {/* Image Upload */}
            {/* <CardInputCommon control={form.control} /> */}

            {/* Name Field */}
            <InputCommon
              control={form.control}
              name="name"
              label="Name"
              placeholder="Enter station name"
            />
            <MapSearchComboboxCommon
              control={form.control}
              name="location"
              label="Location"
              items={frameworks}
              placeholder="Select a location..."
            />
            {/* <MapComponent /> */}
            {/* {station.loading ? (
              <Skeleton className="h-9 w-full" />
            ) : (
              <SelectCommon
                control={form.control}
                name="station_id"
                label="Stations"
                items={station.data}
                placeholder="Please select a station"
              />
            )} */}
            <Button
              type="submit"
              disabled={operator.loading}
              variant={operator.loading ? "outline-full" : "hover-blue-full"}
            >
              {operator.loading ? <Spinner /> : "Add Station"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
const frameworks = [
  { id: "shamsabad", name: "Shamsabad" },
  { id: "rehmanabad", name: "Rehmanabad" },
  { id: "6ht road", name: "6th road" },
];
export default AddStation;
