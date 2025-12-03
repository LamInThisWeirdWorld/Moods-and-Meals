import React from "react";
import add from "../public/Subtract.svg";
import Image from "next/image";

const AddNew = () => {
  return (
    <div className="font-instrument-sans flex h-12 w-40 items-center gap-2 rounded-[10px] bg-[#8AA7BC] pl-4 text-[20px] font-bold text-[#0D273]">
      <Image className="w-5" src={add} alt="" />
      ADD NEW
    </div>
  );
};

export default AddNew;
