"use client";

import { z } from "zod";

export const addOperatorSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long." }),

    email: z.string().email({ message: "Invalid email format." }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),

    confirmPassword: z
      .string()
      .min(6, {
        message: "Confirm password must be at least 6 characters long.",
      }),

    image: z.custom((file) => file instanceof File, {
      message: "Please upload a valid image file.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
