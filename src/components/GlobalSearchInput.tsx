"use client";
import { Search } from "lucide-react";
import React, { ChangeEvent} from "react";

const GlobalSearchInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: string) => void;
}) => {
  const handleGlobalSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className="md:flex gap-4 p-[16px] border-[1px] rounded-lg border-light-700 bg-light-800  dark:dark-gradient dark:border-none hidden self-center ">
      <Search className="w-[24px] h-[24px] text-light-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => handleGlobalSearch(e)}
        className="outline-none bg-transparent  placeholder"
        placeholder="Search anything globally...."
      />
    </div>
  );
};

export default GlobalSearchInput;
