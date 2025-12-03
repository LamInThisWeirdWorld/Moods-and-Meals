import React from "react";
import filter from "../public/Filter_alt_fill.svg";
import Image from "next/image";

const FilterButton = () => {
  return (
    <div className="font-instrument-sans flex h-8 w-25 items-center gap-2 rounded-[10px] bg-[#F5F0E9] pl-4">
      <Image className="w-5" src={filter} alt="" />
      Filter
    </div>
  );
};

export default FilterButton;
