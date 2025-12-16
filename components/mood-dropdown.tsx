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

export function MoodDropDown({
  mood,
  setMood,
}: {
  mood: string;
  setMood: (mood: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{mood}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={mood} onValueChange={setMood}>
          <DropdownMenuRadioItem value="Happy">Happy</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Neutral">Neutral</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Uncomfortable">
            Uncomfortable
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
