"use client";
import { SidebarCommon } from "@/components/common/SidebarCommon";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { Toaster } from "sonner";

const SidebarLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <SidebarCommon />
      <main className="w-full">
        <Toaster position="top-right" closeButton />
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
