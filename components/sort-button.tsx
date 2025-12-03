import React from "react";
import sort from "../public/Sort.svg";
import Image from "next/image";

const SortButton = () => {
  return (
    <div className="font-instrument-sans flex h-10 w-40 items-center gap-2 rounded-[10px] bg-[#F5F0E9] pl-4">
      <Image className="w-5" src={sort} alt="" />
      <span className="font-bold">Sort:</span> default
    </div>
  );
};

export default SortButton;
