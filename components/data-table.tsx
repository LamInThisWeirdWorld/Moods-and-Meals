// import React, { useEffect, useState } from "react";
"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchMealList } from "@/app/action/fetchMealList";
import { useEffect, useState } from "react";
import { supabase } from "@/app/database-client";

type ResponseData = {
  name: string;
  category: string;
  price: number;
  rate: number;
  date: string;
  phase: string;
};

// function FetchTableData() {
//   const [meals, setMeals] = useState<ResponseData[]>([]);
//   const fetchData = async () => {
//     const { data, error } = await supabase.from("MealData").select("*");
//     setMeals(data || []);
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);
// }

export default function DataTable() {
  // const [meals, setMeals] = useState(initialMeals || []);

  // useEffect(() => {
  //   const load = async () => {
  //     const data = await fetchMealList();
  //     setMeals(data || []);
  //   };
  //   load();
  // }, []);
  const [meals, setMeals] = useState<ResponseData[]>([]);
  const fetchData = async () => {
    const { data, error } = await supabase.from("MealData").select("*");
    setMeals(data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Table className="rounded-2xl bg-[#F5F0E9]">
      <TableHeader>
        <TableRow className="rounded-2xl bg-[#CDD7DF] hover:bg-[#CDD7DF]">
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Rate</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Phase</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {meals?.map((meal: ResponseData) => (
          <TableRow>
            <TableCell className="font-medium" key={meal.name}>
              {meal.name}
            </TableCell>
            <TableCell key={meal.category}>{meal.category}</TableCell>
            <TableCell key={meal.price}>{meal.price}</TableCell>
            <TableCell key={meal.rate}>{meal.rate}</TableCell>
            <TableCell key={meal.date}>{meal.date}</TableCell>
            <TableCell key={meal.phase}>{meal.phase}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
