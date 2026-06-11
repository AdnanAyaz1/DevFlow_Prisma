"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Sort = ({ data }: { data: string[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedSort, setSelectedSort] = useState(data[0]); // Default value

  useEffect(() => {
    // Get sort value from URL params
    const sortValue = searchParams.get("sort");
    if (sortValue) {
      setSelectedSort(sortValue);
    }
  }, [searchParams]); // Runs when URL params change

  const handleAnswerSort = (val: string) => {
    setSelectedSort(val); // Update state
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", val);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Select onValueChange={handleAnswerSort} value={selectedSort}>
      <SelectTrigger className="w-[180px] h-[51px] no-focus dark:bg-dark-300 bg-light-800 border-0 dark:text-light-700 flex-center gap-2">
        <Image src={"/icons/filter.svg"} alt="filter" height={16} width={16} />
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="dark:bg-dark-300 bg-light-800">
        {data.map((sort) => (
          <SelectItem key={sort} value={sort}>
            {sort}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Sort;
