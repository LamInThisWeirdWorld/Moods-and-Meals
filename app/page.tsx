'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import SpentCard from '@/components/spent-card';
import WeatherCard from '@/components/weather-card';
import { Calendar } from '@/components/ui/calendar';
import DataTable from '@/components/data-table';
import SearchButton from '@/components/search-button';
import SortButton from '@/components/sort-button';
import FilterButton from '@/components/filter-button';
import React, { useState, useEffect, use } from 'react';
import { supabase } from './database-client';
import AddNewButton from '@/components/addnew-button';
import { fetchMealList } from './action/fetchMealList';
import {
  spentLeft,
  spentPercentage,
  sumSpentMonthly,
  sumSpentWeekly,
} from './action/spentCalculation';
import SwitchMonthWeek from '@/components/switch-month-week';
import type { ResponseData } from '@/lib/meal';
import SetBudgetButton from '@/components/setBudgetButton';

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  // Pass meal data to the table component
  const [meals, setMeals] = useState<ResponseData[]>([]);
  const [isMonthly, setIsMonthly] = useState<boolean>(true);
  const [budget, setBudget] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  // Function to fetch meal data from supabase
  const fetchData = async () => {
    const mealsList = await fetchMealList();
    setMeals(mealsList || []);
  };

  // Calculate total spent this month
  const totalSpentMonthly = sumSpentMonthly(meals);

  const totalSpentWeekly = sumSpentWeekly(meals);
  console.log('Total Spent This Week: ', totalSpentWeekly);

  const percentage = spentPercentage(totalSpentMonthly, budget);
  const moneyLeft = spentLeft(totalSpentMonthly, budget);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen w-screen flex-row gap-5 bg-[#0E141C]">
      <div>
        <SidebarProvider>
          {/* <SidebarTrigger /> */}
          <AppSidebar />
        </SidebarProvider>
      </div>

      {/* RIGHT-HAND SIDE */}
      <div className="mx-30 my-20 flex w-full flex-col">
        <div className="absolute">
          <div className="flex flex-row items-center gap-15">
            <div>
              <p className="font-instrument-sans text-2xl text-white">
                Good morning
              </p>
              <p className="font-instrument-sans text-4xl font-bold text-white">
                Lost in the Maze
              </p>
            </div>
            <SetBudgetButton setBudget={setBudget} />
          </div>
        </div>

        {/* SPENT CARD, WEATHER CARD, CALENDAR */}
        <div className="flex flex-row items-end gap-15">
          <div className="flex flex-col">
            <SwitchMonthWeek isMonth={isMonthly} onSelectMonth={setIsMonthly} />
            <SpentCard
              spentMonthly={totalSpentMonthly}
              spentWeekly={totalSpentWeekly}
              isMonth={isMonthly}
              budget={budget}
              progress={percentage}
              moneyLeft={moneyLeft}
            />
          </div>

          <WeatherCard />
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border"
          />
        </div>

        {/* SEARCH, FILTER, SORT, ADD NEW */}
        <div className="flex flex-col gap-2">
          <div className="mt-10 flex flex-row items-center justify-between">
            <SearchButton />
            {/* SORT && ADD NEW */}
            <div className="flex items-center justify-center gap-5">
              <SortButton />
              <div className="h-10 w-px bg-white"></div>
              {/* pass the fetchData function to be called in the addnew-popup */}
              <AddNewButton onAdded={fetchData} />
            </div>
          </div>
          <FilterButton />
        </div>

        {/* DATA TABLE */}
        <div className="mt-10">
          <DataTable meals={meals} />
        </div>
      </div>
    </div>
  );
}
