import React from 'react';
import Image from 'next/image';
import star from '../../../public/Star.svg';
import matcha from '../../../public/matcha.jpg';
import location from '../../../public/location.svg';
import temperature from '../../../public/temperature.svg';
import blood from '../../../public/blood.svg';
import mood from '../../../public/happy.svg';
import price from '../../../public/price_tag.svg';
import getMealPage from '../../action/getMealPage';
import { format } from 'date-fns';

export default async function mealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const meal = await getMealPage(id);

  if (!meal) {
    return <div>Meal not found id {id}</div>;
  }

  const date = new Date(meal.date);

  // const formattedDate = format(new Date(meal.date), 'dd/MM/yyyy');
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex h-full w-full flex-row justify-around bg-[#0E141C] px-25 py-15">
      {/* left area */}
      <div className="flex flex-col">
        {/* title */}
        <div className="flex flex-row items-center gap-5">
          {/* star and rating */}
          <div className="relative">
            <Image src={star} alt="star" />
            <span className="font-jersey15 absolute inset-0 flex items-center justify-center pt-1.5 text-3xl text-[#0E141C]">
              {meal.rate}
            </span>
          </div>
          {/* title and category */}
          <div className="flex flex-col gap-0.5">
            <span className="font-instrument-sans flex h-5 w-15 items-center justify-center rounded-2xl bg-[#D9D9D9] text-[14px] italic">
              {meal.category}
            </span>
            <div className="font-jersey15 text-5xl text-white">{meal.name}</div>
          </div>
        </div>

        {/* images of the meal */}
        <div className="relative mt-5 flex flex-col gap-5">
          {/* showing image */}
          <div className="relative flex items-center justify-center">
            <div className="h-110 w-110 bg-[#F0E7D5]"></div>
            <div className="absolute inset-0 m-auto flex h-105 w-105">
              <Image src={matcha} alt="pic" fill className="object-cover" />
            </div>
          </div>
          <div className="absolute top-100 left-70 flex w-50 items-center justify-center">
            <Image src={price} alt="price" />
            <span className="font-jersey15 absolute ml-8 text-4xl text-[#F0E7D5]">
              ${meal.price}
            </span>
          </div>

          {/* other images */}
          <div className="ml-1 flex flex-row gap-4">
            <div className="h-20 w-20 bg-[#F0E7D5]"></div>
            <div className="h-20 w-20 bg-[#F0E7D5]"></div>
            <div className="h-20 w-20 bg-[#F0E7D5]"></div>
          </div>
        </div>
      </div>

      {/* right area */}
      <div className="mt-10 ml-30 flex w-200 flex-col gap-4">
        {/* date and location */}
        <div className="mr-5 ml-5 flex flex-row justify-between">
          <span className="font-instrument-sans text-[20px] font-semibold text-[#F0E7D5]">
            {formattedDate}
          </span>
          <div className="flex flex-row items-center gap-3">
            <Image src={location} alt="location" />
            <span className="font-instrument-sans text-[20px] font-semibold text-[#F0E7D5]">
              Matcha Kona
            </span>
          </div>
        </div>
        {/* weather, mood, cycle info */}
        <div className="flex h-15 flex-row justify-between rounded-full bg-[#8AA7BC] px-6">
          {/* weather */}
          <div className="flex flex-row items-center justify-center gap-1">
            <Image src={temperature} alt="temp" />
            <span className="font-instrument-sans text-[20px] font-semibold">
              Sunny, 24°
            </span>
          </div>
          {/* period */}
          <div className="flex flex-row items-center justify-center gap-1">
            <Image src={blood} alt="blood" />
            <span className="font-instrument-sans text-[20px] font-semibold">
              {meal.phase}
            </span>
          </div>
          {/* mood */}
          <div className="flex flex-row items-center justify-center gap-1">
            <Image src={mood} alt="mood" />
            <span className="font-instrument-sans text-[20px] font-semibold">
              Normal
            </span>
          </div>
        </div>

        {/* notes */}
        <div className="relative mt-5 mb-30 h-200 w-200 rounded-2xl bg-[#F0E7D5]">
          <span className="font-instrument-sans absolute mt-3 ml-5 text-3xl font-semibold italic">
            Note
          </span>
        </div>
      </div>
    </div>
  );
}
