"use client";
import { axiosForm, axiosJSON } from "./Axios";

export const ApiCommon = async (
  METHOD,
  type = "json",
  URL,
  ERROR_MESSAGE = "Error making request",
  DATA = null
) => {
  try {
    switch (METHOD) {
      case "post": {
        const response =
          type === "form"
            ? await axiosForm.post(URL, DATA)
            : await axiosJSON.post(URL, DATA);
        return response.data;
      }
      case "put": {
        const response =
          type === "form"
            ? await axiosForm.put(URL, DATA)
            : await axiosJSON.put(URL, DATA);
        return response.data;
      }
      case "delete": {
        const response = await axiosJSON.delete(URL);
        return response.data;
      }
      case "getAll": {
        const response = await axiosJSON.get(URL);
        return response.data;
      }
      default: {
        console.log("Enter a valid method");
        return null;
      }
    }
  } catch (error) {
    console.log(ERROR_MESSAGE);
    console.log(error);
    throw error;
  }
};
