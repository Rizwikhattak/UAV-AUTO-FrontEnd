// OperatorsSchema.js

import { z } from "zod";

export const addOperatorSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),

    // Allow either a File or a string (for the existing image URL)
    image: z.custom(
      (val) => {
        // If empty or not provided, that's okay (optional).
        if (!val) return true;

        // If it's a File
        if (val instanceof File) return true;

        // If it's a string (existing image URL)
        if (typeof val === "string") return true;

        return false;
      },
      {
        message:
          "Please upload a valid image file or provide an existing image URL.",
      }
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
