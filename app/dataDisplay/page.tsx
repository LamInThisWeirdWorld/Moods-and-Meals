'use client';
import React, { useEffect, useMemo } from 'react';
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

type PhaseToMoodData = {
  phase: string;
  happy: number;
  neutral: number;
  uncomfortable: number;
};

type MoodToCategoryData = {
  mood: string;
  categoryCounts: Record<string, number>;
};

export default function dataDisplay() {
  const [mealData, setMealData] = useState<DisplayData[]>([]);
  const [phaseToMoodchartData, setPhaseToMoodChartData] = useState<
    PhaseToMoodData[]
  >([]);

  // Fetch meal data
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

  // Process data for PhaseToMood chart
  useEffect(() => {
    const phaseToMoodresult: Record<string, PhaseToMoodData> = {};

    mealData.forEach((item) => {
      const phase = item.phase;
      const mood = item.mood;

      if (!phaseToMoodresult[phase]) {
        phaseToMoodresult[phase] = {
          phase,
          happy: 0,
          neutral: 0,
          uncomfortable: 0,
        };
      }

      if (mood === 'Happy') phaseToMoodresult[phase].happy++;
      else if (mood === 'Neutral') phaseToMoodresult[phase].neutral++;
      else if (mood === 'Uncomfortable')
        phaseToMoodresult[phase].uncomfortable++;
    });

    setPhaseToMoodChartData(Object.values(phaseToMoodresult));
  }, [mealData]);

  const stackedData = useMemo(() => {
    const result: Record<string, any> = {};
    const categories = new Set<string>();

    mealData.forEach((item) => {
      const { mood, category } = item;

      categories.add(category);

      if (!result[mood]) {
        result[mood] = { mood };
      }

      if (!result[mood][category]) {
        result[mood][category] = 0;
      }

      result[mood][category]++;
    });

    return {
      data: Object.values(result),
      categories: Array.from(categories),
    };
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
                data={phaseToMoodchartData}
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

          <div className="flex h-90 w-160 flex-col rounded-2xl bg-[#F5F0E9] font-bold">
            <div className="font-instrument-sans mt-2 ml-3 text-xl text-[#0D273D]">
              Meal Category Distribution by Moods
            </div>
            <ResponsiveContainer>
              <BarChart
                data={stackedData.data}
                margin={{ top: 15, right: 20, left: -20, bottom: 10 }}
              >
                <XAxis dataKey="mood" />
                <YAxis />
                <Tooltip />
                <Legend />

                {stackedData.categories.map((cat, index) => (
                  <Bar
                    key={cat}
                    dataKey={cat}
                    stackId="a"
                    fill={`hsl(${200 + index * 20}, 45%,65%)`} // auto colors
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
