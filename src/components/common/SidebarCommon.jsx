"use client";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import Link from "next/link";
import Image from "next/image";

const items = [
  {
    title: "Add Drones",
    url: "/drones/AddDrones",
    icon: "/AddDrone.png",
  },
  {
    title: "View Drones",
    url: "/drones/ViewDrones",
    icon: "/ViewDrone.png",
  },
  {
    title: "Add Stations",
    url: "/stations/AddStations",
    icon: "/AddStation.png",
  },
  {
    title: "View Stations",
    url: "/stations/ViewStations",
    icon: "/ViewStation.png",
  },
  {
    title: "Add Operators",
    url: "/operators/AddOperators",
    icon: "/AddOperator.png",
  },
  {
    title: "View Operators",
    url: "/operators/ViewOperators",
    icon: "/ViewOperator.png",
  },
  {
    title: "Plan Mission",
    url: "/planMissions/AddMissionPlan",
    icon: "/PlanMission.png",
  },
  {
    title: "History",
    url: "/history/ViewAllHistory",
    icon: "/History.png",
  },
];

export function SidebarCommon() {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-center">
            <Image
              src="/logo.png"
              width={170}
              height={170}
              className="object-cover"
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="!gap-y-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <Image
                        src={item.icon}
                        width={25}
                        height={25}
                        className="object-cover"
                      />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
