"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SpentCard from "@/components/spent-card";
import WeatherCard from "@/components/weather-card";
import { Calendar } from "@/components/ui/calendar";
import DataTable from "@/components/data-table";
import SearchButton from "@/components/search-button";
import SortButton from "@/components/sort-button";
import FilterButton from "@/components/filter-button";
import React, { useState, useEffect, use } from "react";
import { supabase } from "./database-client";
import AddNewButton from "@/components/addnew-button";
import { fetchMealList } from "./action/fetchMealList";

type ResponseData = {
  name: string;
  category: string;
  price: number;
  rate: number;
  date: string;
  phase: string;
};

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  // Pass meal data to the table component
  const [meals, setMeals] = useState<ResponseData[]>([]);

  // Function to fetch meal data from supabase
  const fetchData = async () => {
    const mealsList = await fetchMealList();
    setMeals(mealsList || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-row bg-[#0E141C]">
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
              {/* pass the fetchData function to be called in the addnew-popup */}
              <AddNewButton onAdded={fetchData} />
            </div>
          </div>

          <FilterButton />
        </div>

        <div className="mt-10 mb-50">
          <DataTable meals={meals} />
        </div>
      </div>

      {/* <hr />
      <div className="mt-10 h-50">
        <hr />
      </div> */}
    </div>
  );
}
