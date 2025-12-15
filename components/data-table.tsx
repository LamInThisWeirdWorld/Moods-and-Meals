// import React, { useEffect, useState } from "react";
'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { ResponseData } from '@/lib/meal';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

// type ResponseData = {
//   name: string;
//   category: string;
//   price: number;
//   rate: number;
//   date: string;
//   phase: string;
// };

export default function DataTable({ meals }: { meals: ResponseData[] }) {
  const router = useRouter();

  return (
    <Table className="rounded-2xl bg-[#F5F0E9]">
      <TableHeader className="px-10">
        <TableRow className="rounded-2xl bg-[#CDD7DF] hover:bg-[#CDD7DF]">
          <TableHead className="text-[20px] font-bold">Name</TableHead>
          <TableHead className="text-[20px] font-bold">Category</TableHead>
          <TableHead className="text-[20px] font-bold">Price</TableHead>
          <TableHead className="text-[20px] font-bold">Rate</TableHead>
          <TableHead className="text-[20px] font-bold">Date</TableHead>
          <TableHead className="text-[20px] font-bold">Phase</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {meals?.map((meal: ResponseData) => (
          <TableRow
            className="cursor-pointer transition hover:bg-[#F0E7D5]"
            onClick={() => router.push(`/meal/${meal.id}`)}
            // maybe dont really need this prefetch since the page is not that heavy
            // onMouseEnter={() => router.prefetch(`/meal/${meal.id}`)}
          >
            <TableCell className="font-medium" key={meal.name}>
              {meal.name}
            </TableCell>
            <TableCell key={meal.category}>{meal.category}</TableCell>
            <TableCell key={meal.price}>{meal.price}</TableCell>
            <TableCell key={meal.rate}>{meal.rate}</TableCell>
            {/* format the date using npm i date-fns */}
            <TableCell key={meal.date}>
              {format(new Date(meal.date), 'dd/MM/yyyy')}
            </TableCell>
            <TableCell key={meal.phase}>{meal.phase}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
