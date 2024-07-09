"use client";

import { useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Badge } from "../ui/badge";
import { HiMinusSm } from "react-icons/hi";

interface TextSelectProps {
  placeholder: string;
  banners: BannerType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const TextSelect: React.FC<TextSelectProps> = ({
  placeholder,
  banners,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");

  let selected: BannerType[];
  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      banners.find((banner) => banner._id === id)
    ) as BannerType[];
  }

  const select = banners.filter((banner) => !selected.includes(banner));

  return (
    <Command className="overflow-visible bg-white">
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.map((banner) => (
          <Badge key={banner._id}>
            {banner.title}
            <button
              onClick={() => onRemove(banner._id)}
              className="ml-1 hover:text-red-500 transition"
            >
              <HiMinusSm />
            </button>
          </Badge>
        ))}
        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
        />
      </div>
      <CommandList className="mt-2">
        <CommandGroup className="w-full overflow-auto border rounded-md">
          {select.map((banner) => (
            <CommandItem
              key={banner._id}
              onMouseDown={(e) => e.preventDefault()}
              onSelect={() => {
                onChange(banner._id);
                setInputValue("");
              }}
              className="mb-2 ml-2 cursor-pointer hover:bg-gray-400 transition"
            >
              {banner.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default TextSelect;
