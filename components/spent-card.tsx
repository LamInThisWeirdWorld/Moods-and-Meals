import React from 'react';
import { Progress } from '@/components/ui/progress';

type SpentCardProps = {
  spentMonthly: number;
  spentWeekly: number;
  isMonth: boolean;
  budget: number;
  progress: number;
  moneyLeft: number;
};

const SpentCard = ({
  spentMonthly,
  spentWeekly,
  isMonth,
  budget,
  progress,
  moneyLeft,
}: SpentCardProps) => {
  const period = isMonth ? 'month' : 'week';
  const spent = isMonth ? spentMonthly : spentWeekly;
  return (
    <div className="flex h-40 w-100 flex-col justify-center rounded-2xl bg-[#A6BED1]">
      <div className="flex flex-row items-center justify-between">
        <div className="font-instrument-sans ml-5 text-2xl text-[#0D273D]">
          Spent this {period}
        </div>

        <div className="font-instrument-sans mr-4 text-[15px] font-semibold text-[#0D273D]">
          Budget: ${budget}
        </div>
      </div>

      <div className="font-jersey15 mt-0 ml-5 pt-0 text-5xl tracking-wide text-[#0D273D]">
        ${spent.toFixed(2)}
      </div>

      <div className="font-instrument-sans ml-5 text-2xl text-[#0D273D]">
        <span className="font-bold">${moneyLeft.toFixed(2)}</span> left in your
        budget
      </div>
      <Progress className="mt-3 ml-5 w-90" value={progress} />
    </div>
  );
};

export default SpentCard;
