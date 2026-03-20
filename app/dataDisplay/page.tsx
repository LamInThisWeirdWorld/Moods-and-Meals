'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { fetchDisplayData } from '../action/fetchDisplayData';
import { DisplayData } from '@/lib/meal';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type ChartData = {
  phase: string;
  happy: number;
  neutral: number;
  uncomfortable: number;
};

export default function dataDisplay() {
  const [mealData, setMealData] = useState<DisplayData[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDisplayData();

      const formatted = (data || []).map((item: any) => ({
        date: item.date,
        mood: item.mood,
        phase: item.phase,
        price: item.price,
        category: item.category,
      }));

      setMealData(formatted);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const result: Record<string, ChartData> = {};

    mealData.forEach((item) => {
      const phase = item.phase;
      const mood = item.mood;

      if (!result[phase]) {
        result[phase] = {
          phase,
          happy: 0,
          neutral: 0,
          uncomfortable: 0,
        };
      }

      if (mood === 'Happy') result[phase].happy++;
      else if (mood === 'Neutral') result[phase].neutral++;
      else if (mood === 'Uncomfortable') result[phase].uncomfortable++;
    });

    setChartData(Object.values(result));
  }, [mealData]);

  return (
    <div className="flex min-h-screen w-full flex-row gap-5 bg-[#0E141C]">
      <div>
        <SidebarProvider>
          {/* <SidebarTrigger /> */}
          <AppSidebar />
        </SidebarProvider>
      </div>

      <div className="mx-30 my-20 flex w-full flex-col gap-15">
        <div className="flex flex-col gap-2">
          <p className="font-instrument-sans text-4xl font-bold text-white">
            Insights Dashboard
          </p>
          <p className="font-instrument-sans text-xl text-white">
            Track and visualize your data over time to uncover trends, patterns,
            and meaningful insights.
          </p>
        </div>

        <div className="flex flex-row gap-20">
          <div className="flex h-90 w-160 flex-col rounded-2xl bg-[#A6BED1] font-bold">
            <div className="font-instrument-sans mt-2 ml-3 text-xl text-[#0D273D]">
              Mood Distribution by Cycle Phase
            </div>
            <ResponsiveContainer>
              <BarChart
                data={chartData}
                margin={{ top: 15, right: 20, left: -20, bottom: 10 }}
              >
                <XAxis dataKey="phase" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar dataKey="happy" fill="#3A3e6c" />
                <Bar dataKey="neutral" fill="#8387C3" />
                <Bar dataKey="uncomfortable" fill="#8A8CAC" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex h-80 w-150 flex-col rounded-2xl bg-[#3E6985] font-bold">
            <div className="font-instrument-sans mt-2 ml-3 text-xl text-[#0D273D]">
              Meal Category Distribution by Moods
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
