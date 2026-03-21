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

  type HeatmapCell = {
    key: string; // "phase-mood"
    [category: string]: number | string;
  };

  const heatmapData = useMemo(() => {
    const result: Record<string, HeatmapCell> = {};
    const categories = new Set<string>();

    mealData.forEach((item) => {
      const combo = `${item.phase} • ${item.mood}`;
      const category = item.category;

      categories.add(category);

      if (!result[combo]) {
        result[combo] = { key: combo };
      }

      if (!result[combo][category]) {
        result[combo][category] = 0;
      }

      (result[combo][category] as number)++;
    });

    return {
      data: Object.values(result),
      categories: Array.from(categories),
    };
  }, [mealData]);

  const getHeatColor = (value: number, max: number) => {
    if (max === 0) return 'hsl(234, 20%, 90%)'; // empty = very light

    const intensity = value / max;

    return `hsl(234, 35%, ${85 - intensity * 50}%)`;
  };

  const maxValue = useMemo(() => {
    let max = 0;

    heatmapData.data.forEach((row) => {
      heatmapData.categories.forEach((cat) => {
        const val = (row[cat] as number) || 0;
        if (val > max) max = val;
      });
    });

    return max;
  }, [heatmapData]);

  return (
    <div className="mb-25 flex h-full w-full flex-row gap-5 bg-[#0E141C]">
      <div>
        <SidebarProvider>
          {/* <SidebarTrigger /> */}
          <AppSidebar />
        </SidebarProvider>
      </div>

      <div className="mx-30 flex w-full flex-col gap-15">
        // Title and description
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
          {/* Bar chart for phase to mood distribution */}
          <div className="flex h-90 w-160 flex-col items-center justify-center rounded-2xl bg-[#A6BED1] font-bold">
            <div className="font-instrument-sans mt-2 text-xl text-[#0D273D]">
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
          {/* Stacked bar chart for meal category distribution by mood */}
          <div className="flex h-90 w-160 flex-col items-center justify-center rounded-2xl bg-[#F5F0E9] font-bold">
            <div className="font-instrument-sans mt-2 text-xl text-[#0D273D]">
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
                    fill={`hsl(${200 + index * 20}, 45%,65%)`}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="h-full max-h-fit w-full max-w-fit overflow-x-auto overflow-y-auto rounded-2xl bg-[#F5F0E9] font-bold">
          <div className="overflow-x-auto">
            <table className="m-5">
              <thead>
                <tr>
                  <th className="p-2"></th>
                  {heatmapData.categories.map((cat) => (
                    <th key={cat} className="pb-2 text-sm">
                      {cat}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {heatmapData.data.map((row) => (
                  <tr key={row.key}>
                    {/* Y-axis label */}
                    <td className="pr-2 font-semibold">{row.key}</td>

                    {/* Heat cells */}
                    {heatmapData.categories.map((cat) => {
                      const value = (row[cat] as number) || 0;

                      return (
                        <td
                          key={cat}
                          className="h-12 w-12 text-center text-xs font-medium"
                          style={{
                            backgroundColor: getHeatColor(value, maxValue),
                          }}
                        >
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
