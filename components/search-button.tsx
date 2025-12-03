import React from "react";
import search from "../public/Search.svg";
import Image from "next/image";

const SearchButton = () => {
  return (
    <div className="font-instrument-sans flex h-10 w-50 items-center gap-2 rounded-full bg-[#D9D9D9] pl-4">
      <Image className="w-5" src={search} alt="" />
      Search
    </div>
  );
};

export default SearchButton;
