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

export function WeatherDropDown({
  weather,
  setWeather,
}: {
  weather: string;
  setWeather: (phase: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{weather}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={weather} onValueChange={setWeather}>
          <DropdownMenuRadioItem value="Sunny">Sunny</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Rainy">Rainy</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Cloudy">Cloudy</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Windy">Windy</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
