"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SpentCard from "@/components/spent-card";
import WeatherCard from "@/components/weather-card";
import { Calendar } from "@/components/ui/calendar";
import React from "react";

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className="flex h-screen flex-row bg-[#0E141C]">
      <SidebarProvider>
        {/* <SidebarTrigger /> */}
        <AppSidebar />
      </SidebarProvider>

      <div className="ml-30">
        <div className="absolute">
          <p className="font-instrument-sans mt-10 text-2xl text-white">
            Good morning
          </p>
          <p className="font-instrument-sans text-4xl font-bold text-white">
            Lost in the Maze
          </p>
        </div>

        <div className="absolute mt-10 flex flex-row items-end gap-15">
          <SpentCard />
          <WeatherCard />
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border"
          />
        </div>
      </div>
    </div>
  );
}
