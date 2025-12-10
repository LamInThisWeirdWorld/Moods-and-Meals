"use client";
import React, { useState } from "react";

const SwitchMonthWeek = ({
  isMonth,
  onSelectMonth,
}: {
  isMonth: boolean;
  onSelectMonth: (tag: boolean) => void;
}) => {
  //   const [isMonth, setIsMonth] = useState<boolean>(selected);
  return (
    <div className="mr-3 flex h-5 flex-row-reverse gap-1">
      <button
        onClick={() => onSelectMonth(false)}
        className={`font-instrument-sans h-5 w-10 origin-bottom transform cursor-pointer rounded-t-md transition-transform duration-175 ${isMonth ? "scale-75 bg-[#F5F0E9]" : "scale-125 bg-[#3E6985]"} text-center font-bold`}
      >
        W
      </button>

      <button
        onClick={() => onSelectMonth(true)}
        className={`font-instrument-sans h-5 w-10 origin-bottom transform cursor-pointer rounded-t-md transition-transform duration-175 ${isMonth ? "scale-125 bg-[#3E6985]" : "scale-75 bg-[#F5F0E9]"} text-center font-bold`}
      >
        M
      </button>
    </div>
  );
};

export default SwitchMonthWeek;
