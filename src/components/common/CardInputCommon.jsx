"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Card, CardContent } from "../ui/card";
import { Plus } from "lucide-react";

const CardInputCommon = ({ name = "image", control }) => {
  const { setValue, watch } = useFormContext();
  const imageValue = watch(name);

  const openFilePicker = () => {
    document.getElementById(name).click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue(name, file); // Store file in React Hook Form
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="image-input flex flex-col items-center justify-center">
          <FormControl>
            <div>
              <input
                id={name}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              {/* Card Clickable to Open File Picker */}
              <Card
                className="cursor-pointer w-72 flex items-center justify-center hover:bg-gray-200 transition-all ease-in-out shadow-lg !p-0"
                onClick={openFilePicker}
              >
                <CardContent className="h-40 flex items-center justify-center !p-0">
                  {imageValue instanceof File ? (
                    <img
                      src={URL.createObjectURL(imageValue)}
                      alt="Selected"
                      className="h-full w-full object-cover rounded-md"
                    />
                  ) : (
                    <Plus className="text-gray-500" />
                  )}
                </CardContent>
              </Card>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CardInputCommon;
