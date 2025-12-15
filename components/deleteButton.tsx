'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import deleteMeal from '@/app/action/deleteMeal';

export default function DeleteButton({ mealId }: { mealId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteMeal(mealId);
    router.push('/');
  };

  return (
    <button
      onClick={handleDelete}
      className="right-180 flex h-10 w-30 cursor-pointer items-center justify-center self-end rounded-2xl border-2 border-[#F04D23] text-[20px] text-[#F04D23] transition hover:bg-[#F04D23] hover:text-white"
    >
      Delete
    </button>
  );
}
