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

export function PhaseDropDown({
  phase,
  setPhase,
}: {
  phase: string;
  setPhase: (phase: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{phase}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={phase} onValueChange={setPhase}>
          <DropdownMenuRadioItem value="Menstrual">
            Meanstrual (Period)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Follicular">
            Follicular (Post-period)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Ovulatory">
            Ovulation
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Luteal">
            Luteal (Pre-period)
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
