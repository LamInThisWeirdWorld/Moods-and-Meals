import React, { FormEvent, useState } from 'react';
import { Dialog, DialogTrigger } from './ui/dialog';
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
import Image from 'next/image';
import add from '../public/Subtract.svg';
import { ClipLoader, DotLoader } from 'react-spinners';

const SetBudgetButton = ({
  setBudget,
}: {
  setBudget: (budget: number) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [onAdding, setOnAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (isSubmitting) return;
    // setIsSubmitting(true);

    // const formData = new FormData(e.currentTarget);

    // const monthlyBudget = Number(formData.get('monthlyBudget'));
    setBudget(input);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="submit"
          className="font-instrument-sans flex h-12 w-45 items-center gap-2 rounded-[10px] bg-[#8AA7BC] pl-3 text-[20px] font-bold text-[#0D273] hover:scale-112"
        >
          <Image className="w-5" src={add} alt="" />
          SET BUDGET
        </button>
      </DialogTrigger>
      {/* onSuccess will call setOpen state and the onAdded function (which is fetching the data) */}
      <DialogContent className="max-h-160 overflow-auto rounded-none">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-5">
            <DialogTitle>This month I want to spend...</DialogTitle>
            {/* <DialogDescription>Give information about the meal</DialogDescription> */}
          </DialogHeader>

          <div className="grid gap-3">
            {/* <Label htmlFor="monthlyBudget">Monthly Budget</Label> */}
            <Input
              name="monthlyBudget"
              type="number"
              value={input ?? 0}
              onChange={(e) => setInput(Number(e.target.value))}
            />
          </div>

          <DialogFooter className="mt-5 mb-5 flex items-center gap-5">
            <DialogClose asChild>
              <Button className="bg-transparent text-black hover:bg-transparent hover:text-red-600">
                Cancle
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className={`'bg-[#0D273D] hover:bg-green-700' rounded-[10px] px-4 py-2 text-white`}
            >
              Set
            </Button>
            {/* <ClipLoader loading={isLoading} /> */}
            <DotLoader size={30} loading={isLoading} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SetBudgetButton;
