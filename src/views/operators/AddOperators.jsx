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
import { Form } from "@/components/ui/form";
import CardInputCommon from "@/components/common/CardInputCommon";
import InputCommon from "@/components/common/InputCommon";
import { Button } from "@/components/ui/button";

const AddOperators = () => {
  const operator = useSelector((state) => state.operator);
  const dispatch = useDispatch();
  const [inputImage, setInputImage] = useState(null);

  const initialState = {
    name: "",
    location: "",
    lat: 0,
    long: 0,
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
    <div className="flex justify-center p-10 bg-[--color-avocado-100]">
      <div className="flex flex-col w-[70%] gap-4">
        <div className="content-header text-center">
          <h1 className="text-xl font-bold">Add New Operator</h1>
          <p>Register an operator to manage drone operations efficiently</p>
        </div>
        <Form {...form} className="w-full">
          <form
            onSubmit={form.handleSubmit(handleFormSubmit, handleError)}
            className="space-y-4"
          >
            {/* Image Upload */}
            <CardInputCommon control={form.control} />

            {/* Name Field */}
            <InputCommon
              control={form.control}
              name="name"
              label="Name"
              placeholder="Enter operator name"
            />

            {/* Email Field */}
            <InputCommon
              control={form.control}
              name="email"
              inputType="email"
              label="Email"
              placeholder="Enter email"
            />

            {/* Password Field */}
            <InputCommon
              control={form.control}
              name="password"
              inputType="password"
              label="Password"
              placeholder="Enter password"
            />

            {/* Confirm Password Field */}
            <InputCommon
              control={form.control}
              name="confirmPassword"
              inputType="password"
              label="Confirm Password"
              placeholder="Re-enter password"
            />

            <Button
              type="submit"
              disabled={operator.loading}
              variant={operator.loading ? "outline-full" : "hover-blue-full"}
            >
              {operator.loading ? <Spinner /> : "Add Operator"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddOperators;
