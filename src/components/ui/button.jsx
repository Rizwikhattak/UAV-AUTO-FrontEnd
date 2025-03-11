"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          " cursor-pointer bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          " cursor-pointer bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          " cursor-pointer border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        "outline-full":
          " cursor-pointer border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground w-full",
        secondary:
          " cursor-pointer bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        "hover-blue-full":
          "px-4 cursor-pointer  py-2 w-full bg-[var(--primary-custom)]  rounded-md text-white transition-all duration-200 hover:bg-white hover:ring hover:ring-[var(--primary-custom)] hover:text-[var(--primary-custom)]",
        "hover-blue-fit":
          "px-4 cursor-pointer  py-2 w-fit bg-[var(--primary-custom)] border border-[var(--primary-custom)] rounded-md text-white transition-all duration-200 hover:bg-white hover:text-[var(--primary-custom)]",
        "hover-outline-purple":
          "!px-3 cursor-pointer  !py-1 w-fit rounded-md border-[1.5px] border-purple-400 text-purple-700  hover:bg-purple-600 hover:border-purple-600 hover:text-white transition-all duration-200",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
