"use client";
import InputCommon from "@/components/common/InputCommon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { addDroneSchema } from "@/views/drones/DroneSchema";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

const LoginAdmin = () => {
  const drone = useSelector((state) => state.drone);

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
    resolver: zodResolver(addDroneSchema),
    defaultValues: initialState,
  });
  const handleFormSubmit = async (data) => {
    // try {
    //   console.log("Form Submitted:", data);
    //   const formData = new FormData();
    //   Object.entries(data).forEach(([key, value]) => {
    //     formData.append(key, value);
    //   });
    //   // await dispatch(addDrone(formData)).unwrap();
    //   form.reset();
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleError = (errors) => {
    console.log("Validation Errors:", errors);
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-2xl">
        <CardContent className="h-96 flex flex-col">
          <CardHeader className="flex justify-center items-center ">
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <div className=" flex-1 flex flex-col justify-end">
            <Form {...form} className="w-full">
              <form
                onSubmit={form.handleSubmit(handleFormSubmit, handleError)}
                className="space-y-4 pt-16"
              >
                {/* <CardInputCommon control={form.control} /> */}
                <InputCommon
                  control={form.control}
                  name="name"
                  label="Email"
                  placeholder="Enter Email"
                />
                <InputCommon
                  control={form.control}
                  inputType="number"
                  name="speed"
                  label="Password"
                  placeholder="Enter password"
                />

                <Button
                  type="submit"
                  variant={drone.loading ? "outline-full" : "hover-blue-full"}
                  disabled={drone.loading}
                >
                  {drone.loading ? <Spinner /> : "Login"}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginAdmin;
