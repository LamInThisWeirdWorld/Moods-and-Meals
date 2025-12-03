import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DataTable() {
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
        <TableRow>
          <TableCell className="font-medium">Coconut Matcha</TableCell>
          <TableCell>Drink</TableCell>
          <TableCell>$7.5</TableCell>
          <TableCell>8.5</TableCell>
          <TableCell>26/11</TableCell>
          <TableCell>Nan</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
