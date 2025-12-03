import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export const AddNewPopup = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add your meal details</DialogTitle>
        <DialogDescription>Give information about the meal</DialogDescription>
      </DialogHeader>

      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="name-1">Name of the Meal</Label>
          <Input id="name" name="Meal name" />
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

        <div className="grid gap-3">
          <Label htmlFor="date">Rate</Label>
          <Input id="rate" name="rate" />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="phase">Phase</Label>
          <Input id="phase" name="phase" />
        </div>
      </div>

      <DialogFooter className="gap-5">
        <DialogClose asChild>
          <button>Cancle</button>
        </DialogClose>
        <button
          type="submit"
          className="rounded-[10px] bg-[#8AA7BC] px-4 py-2 text-white"
        >
          Add Meal
        </button>
      </DialogFooter>
    </DialogContent>
  );
};
