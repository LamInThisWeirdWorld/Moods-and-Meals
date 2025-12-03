"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SpentCard from "@/components/spent-card";
import WeatherCard from "@/components/weather-card";
import { Calendar } from "@/components/ui/calendar";
import DataTable from "@/components/data-table";
import SearchButton from "@/components/search-button";
import AddNew from "@/components/addnew-button";
import SortButton from "@/components/sort-button";
import FilterButton from "@/components/filter-button";
import React from "react";

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className="flex h-screen flex-row bg-[#0E141C]">
      <SidebarProvider>
        {/* <SidebarTrigger /> */}
        <AppSidebar />
      </SidebarProvider>

      <div className="ml-30 flex flex-col">
        <div className="absolute">
          <p className="font-instrument-sans mt-10 text-2xl text-white">
            Good morning
          </p>
          <p className="font-instrument-sans text-4xl font-bold text-white">
            Lost in the Maze
          </p>
        </div>

        <div className="mt-10 flex flex-row items-end gap-15">
          <SpentCard />
          <WeatherCard />
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="mt-10 flex flex-row items-center justify-between">
            <SearchButton />
            <div className="flex items-center justify-center gap-5">
              <SortButton />
              <div className="h-10 w-px bg-white"></div>
              <AddNew />
            </div>
          </div>

          <FilterButton />
        </div>

        <div className="mt-10">
          <DataTable />
        </div>
      </div>
    </div>
  );
}
