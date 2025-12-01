import React from "react";
import rain from "../public/rain.svg";
import Image from "next/image";

const WeatherCard = () => {
  return (
    <div className="flex h-40 w-80 flex-row gap-15 rounded-2xl bg-[#3E6985]">
      <div className="flex flex-col justify-center">
        <div className="font-instrument-sans ml-5 text-2xl text-white">
          Melbourne
        </div>
        <div className="font-jersey15 text-1xl mt-0 ml-5 pt-0 tracking-wide text-white">
          11:11 • 1/12
        </div>
        <div className="font-instrument-sans ml-5 pt-3 text-4xl font-black text-white">
          11°C
        </div>
      </div>

      <Image src={rain} alt="" />
    </div>
  );
};

export default WeatherCard;
