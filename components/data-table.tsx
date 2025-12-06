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

type ResponseData = {
  name: string;
  category: string;
  price: number;
  rate: number;
  date: string;
  phase: string;
};

export default function DataTable({ meals }: { meals: ResponseData[] }) {
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
