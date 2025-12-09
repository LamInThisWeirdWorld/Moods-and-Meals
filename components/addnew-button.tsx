"use client";

import { useState } from "react";
import add from "../public/Subtract.svg";
import Image from "next/image";
import { Dialog, DialogTrigger } from "./ui/dialog";
import AddNewPopup from "./addnew-popup";

export default function AddNewButton({ onAdded }: { onAdded: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="submit"
          className="font-instrument-sans flex h-12 w-40 items-center gap-2 rounded-[10px] bg-[#8AA7BC] pl-4 text-[20px] font-bold text-[#0D273] hover:scale-112"
        >
          <Image className="w-5" src={add} alt="" />
          ADD NEW
        </button>
      </DialogTrigger>
      {/* onSuccess will call setOpen state and the onAdded function (which is fetching the data) */}
      <AddNewPopup
        onSuccess={() => {
          setOpen(false);
          onAdded();
        }}
      />
    </Dialog>
  );
}

// export default AddNewButton;
