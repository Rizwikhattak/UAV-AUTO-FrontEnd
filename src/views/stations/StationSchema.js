// stationSchema.js
import { z } from "zod";

export const addStationSchema = z.object({
  // The station’s name (your own internal label)
  name: z
    .string()
    .min(2, "Station name must be at least 2 characters long."),

  // The selected location from a dropdown or Google Maps API
  // (e.g., a formatted address or place name)
  location: z
    .string()
    .min(2, "Please select a valid location from the dropdown."),

  // If you store lat/lng from the Google Maps API result
  lat: z
    .number({
      invalid_type_error: "Latitude must be a number.",
    })
    .optional(),

  lng: z
    .number({
      invalid_type_error: "Longitude must be a number.",
    })
    .optional(),
});
