'use client';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import DeleteButton from './deleteButton';
import deleteMeal from '@/app/action/deleteMeal';

export function DeleteMealPopup({ mealId }: { mealId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteMeal(mealId);
    router.push('/');
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button
          //   onClick={handleDelete}
          className="right-180 flex h-10 w-30 cursor-pointer items-center justify-center self-end rounded-2xl border-2 border-[#F04D23] text-[20px] text-[#F04D23] transition hover:bg-[#F04D23] hover:text-white"
        >
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to delete this meal?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the meal.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
