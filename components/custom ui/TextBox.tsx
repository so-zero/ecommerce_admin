"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { HiMinusSm } from "react-icons/hi";

interface TextBoxProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const TextBox: React.FC<TextBoxProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [textValue, setTextValue] = useState("");

  const addValue = (item: string) => {
    onChange(item);
    setTextValue("");
  };

  return (
    <>
      <Input
        placeholder={placeholder}
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addValue(textValue);
          }
        }}
      />
      <div className="flex gap-1 flex-wrap mt-6">
        {value.map((item, index) => (
          <Badge key={index} className="bg-gray-600 text-white">
            {item}
            <button className="ml-1" onClick={() => onRemove(item)}>
              <HiMinusSm className="hover:text-red-500 transition" />
            </button>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default TextBox;
