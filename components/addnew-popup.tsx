'use client';

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from '@/components/ui/button';
import { addMeal } from '@/app/action/addMeal';
import { InputData } from '@/lib/meal';
import { MoodDropDown } from './mood-dropdown';
import { useState } from 'react';
import { PhaseDropDown } from './phase-dropdown';
import { CategoryDropDown } from './category-dropdown';
import { WeatherDropDown } from './wather-dropdown';
import Image from 'next/image';
import { ClipLoader, DotLoader } from 'react-spinners';
import { uploadImages } from '@/app/action/uploadImages';

export default function AddNewPopup({ onSuccess }: { onSuccess: () => void }) {
  const [mood, setMood] = useState<string>('Happy');
  const [phase, setPhase] = useState<string>('Luteal');
  const [category, setCategory] = useState<string>('Other');
  const [weather, setWeather] = useState<string>('Sunny');
  const [images, setImage] = useState<File[]>([]);
  const [onAdding, setOnAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    let errorMessage;

    const data: InputData = {
      name: (formData.get('mealName') as string) || 'none',
      category: category || 'none',
      place: (formData.get('place') as string) || 'none',
      price: Number(formData.get('price')) || 0,
      rate: Number(formData.get('rate')) || 0,
      date: (formData.get('date') as string) || 'none',
      phase: phase || 'Luteal',
      mood: mood || 'Happy',
      note: (formData.get('note') as string) || '',
      weather: weather || 'none',
      temperature: Number(formData.get('temperature')) || 0,
    };

    console.log(images);

    // call the addMeal funnction to add meal to the database
    setOnAdding(true);
    setIsLoading(true);
    errorMessage = await addMeal(data, images);

    if (errorMessage) {
      console.error('Error adding meal:', errorMessage);
      setOnAdding(false);
      setIsLoading(false);
      setImage([]);
      return;
    } else {
      setOnAdding(false);
      setIsLoading(false);
      setImage([]);
      console.log('Meal added successfully');
    }
    console.log(data);

    // automately close the window and re-render the table after submission
    onSuccess();
  };
  return (
    <DialogContent className="max-h-160 overflow-auto rounded-none">
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Add your meal details</DialogTitle>
          <DialogDescription>Give information about the meal</DialogDescription>
        </DialogHeader>

        <div className="mt-5 grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name of the Meal</Label>
              <Input id="name" name="mealName" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <CategoryDropDown category={category} setCategory={setCategory} />
            </div>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="name">Got it from</Label>
            <Input id="place" name="place" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="rate">Rate</Label>
              <Input id="rate" name="rate" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="mood">Mood</Label>
              <MoodDropDown mood={mood} setMood={setMood} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phase">Phase</Label>
              <PhaseDropDown phase={phase} setPhase={setPhase} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="weather">Weather</Label>
              <WeatherDropDown weather={weather} setWeather={setWeather} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phase">Temperature</Label>
              <Input id="temperature" name="temperature" />
            </div>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="date">Date</Label>
            <Input type="date" id="date" name="date" defaultValue={today} />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="date">Note</Label>
            <Input id="note" name="note" />
          </div>

          <div className="mt-3 grid gap-3">
            {/* Better UI for upload image  */}
            <label className="flex h-8 w-30 cursor-pointer items-center justify-center rounded-lg border-2 border-[#0D273D] text-[15px] font-semibold text-[#0D273D] hover:bg-[#0D273D] hover:text-white">
              Upload image
              <input
                className="hidden"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);

                  if (files.length > 5) {
                    alert('You can upload up to 5 images only');
                    return;
                  }

                  setImage(files);
                }}
              />
            </label>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {images.map((file, index) => (
              <Image
                width={20}
                height={20}
                key={index}
                src={URL.createObjectURL(file)}
                alt="review"
                className="h-24 w-24 rounded object-cover"
              />
            ))}
          </div>
        </div>

        <DialogFooter className="mt-5 mb-5 flex items-center gap-5">
          <DialogClose asChild>
            <Button className="bg-transparent text-black hover:bg-transparent hover:text-red-600">
              Cancle
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className={`rounded-[10px] ${onAdding ? 'cursor-not-allowed border-gray-400 text-gray-400 opacity-50' : 'bg-[#0D273D] px-4 py-2 text-white hover:bg-green-700'} `}
          >
            {onAdding ? 'Adding...' : 'Add Meal'}
          </Button>
          {/* <ClipLoader loading={isLoading} /> */}
          <DotLoader size={30} loading={isLoading} />
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
