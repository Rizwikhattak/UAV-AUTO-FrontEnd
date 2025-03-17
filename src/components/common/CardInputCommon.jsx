"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Card, CardContent } from "../ui/card";
import { Plus } from "lucide-react";

const CardInputCommon = ({ name = "image", control }) => {
  const { setValue, watch } = useFormContext();
  const imageValue = watch(name);
  console.log("Image Value", imageValue);
  const openFilePicker = () => {
    document.getElementById(name).click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue(name, file); // Store file in React Hook Form
    }
  };

  // Helper to render the appropriate image
  const renderImage = () => {
    // 1. If the user selected a File:
    if (imageValue instanceof File) {
      return (
        <img
          src={URL.createObjectURL(imageValue)}
          alt="Selected"
          className="h-full w-full object-fit rounded-md"
        />
      );
    }
    // 2. If imageValue is a string (existing URL from server)
    if (typeof imageValue === "string" && imageValue.length > 0) {
      return (
        <img
          src={imageValue}
          alt="Existing"
          className="h-full w-full object-fit rounded-md"
        />
      );
    }
    // 3. Fallback (no image)
    return <Plus className="text-gray-500" />;
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
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
                <CardContent className="h-40 flex items-center justify-center w-full !p-0">
                  {renderImage()}
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
