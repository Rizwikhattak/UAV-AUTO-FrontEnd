"use client";
import { SidebarCommon } from "@/components/common/SidebarCommon";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { Toaster } from "sonner";
import "./globals.css";
import HeaderCommon from "@/components/common/HeaderCommon";
const SidebarLayout = ({ children }) => {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "15rem",
        "--sidebar-width-mobile": "10rem",
      }}
    >
      <SidebarCommon />
      <main className="w-full flex flex-col overflow-x-hidden">
        <Toaster position="top-right" closeButton />
        <div className="flex items-center justify-between px-4 py-4 bg-gradient-to-r bg-gray-50 border-b">
          <SidebarTrigger />
          <HeaderCommon />
        </div>
        <div className="flex-1">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
