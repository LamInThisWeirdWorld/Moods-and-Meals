'use client';

import { type DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Checked = DropdownMenuCheckboxItemProps['checked'];

export function CategoryDropDown({
  category,
  setCategory,
}: {
  category: string;
  setCategory: (category: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{category}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={category} onValueChange={setCategory}>
          <DropdownMenuRadioItem value="Drink">Drink</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Snack">Snack</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Fast food">
            Fast food
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Food">Food</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Other">Other</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
