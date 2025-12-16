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

export default function AddNewPopup({ onSuccess }: { onSuccess: () => void }) {
  const [mood, setMood] = useState<string>('Happy');
  const [phase, setPhase] = useState<string>('Luteal');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    let errorMessage;

    const data: InputData = {
      name: (formData.get('mealName') as string) || 'none',
      category: (formData.get('category') as string) || 'none',
      price: Number(formData.get('price')) || 0,
      rate: Number(formData.get('rate')) || 0,
      date: (formData.get('date') as string) || 'none',
      phase: phase || 'Luteal',
      mood: mood || 'Happy',
      note: (formData.get('note') as string) || '',
    };

    // call the addMeal funnction to add meal to the database
    errorMessage = await addMeal(data);

    if (errorMessage) {
      console.error('Error adding meal:', errorMessage);
      return;
    } else {
      console.log('Meal added successfully');
    }
    console.log(data);

    // automately close the window and re-render the table after submission
    onSuccess();
  };
  return (
    <DialogContent>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Add your meal details</DialogTitle>
          <DialogDescription>Give information about the meal</DialogDescription>
        </DialogHeader>

        <div className="mt-5 grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name of the Meal</Label>
            <Input id="name" name="mealName" required />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="category">Category</Label>
            <Input id="category" name="category" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="rate">Rate</Label>
              <Input id="rate" name="rate" />
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

          <div className="grid gap-3">
            <Label htmlFor="date">Date</Label>
            <Input type="date" id="date" name="date" />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="date">Note</Label>
            <Input id="note" name="note" />
          </div>
        </div>

        <DialogFooter className="mt-5 gap-5">
          <DialogClose asChild>
            <Button className="bg-transparent text-black hover:bg-transparent hover:text-red-600">
              Cancle
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="rounded-[10px] bg-[#0D273D] px-4 py-2 text-white hover:bg-green-700"
          >
            Add Meal
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
