"use client";

import {
  Calendar,
  Home,
  Inbox,
  Settings,
  ChartNoAxesColumn,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";

import User_icon from "../public/User.svg";
import Link from "next/link";
import Image from "next/image";

const items = [
  { title: "Home", url: "./", icon: Home },
  { title: "Data", url: "./", icon: ChartNoAxesColumn },
  { title: "Setting", url: "./", icon: Settings },
];

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center bg-[#f5f0e9]">
        <a href="./">
          <Image src={User_icon} alt="" className="mt-4 w-8" />
        </a>
      </SidebarHeader>
      <SidebarContent className="flex items-center justify-center bg-[#f5f0e9]">
        <SidebarGroup className="flex p-2">
          <SidebarGroupContent className="flex items-center justify-center">
            <SidebarMenu className="gap-10">
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuSubItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="flex items-center justify-center"
                    >
                      <a href={item.url}>
                        {/* <Icon
                          style={{ width: 20, height: 20 }}
                          className="hover:h-50 hover:w-50"
                        /> */}
                        <Icon className="h-6! w-6! transition-all duration-100 hover:h-10! hover:w-10!" />
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter /> */}
    </Sidebar>
  );
}
