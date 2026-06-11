"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function LocalSearch({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (debouncedQuery) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("search", debouncedQuery);
        router.push(`?${params.toString()}`, { scroll: false });
      } else {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("search");
        router.push(`?${params.toString()}`, { scroll: false });
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [debouncedQuery, router, searchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebouncedQuery(e.target.value);
  };

  return (
    <div className="flex gap-4 p-[16px] border-[1px] rounded-lg border-light-700 bg-light-800 flex-1 dark:dark-gradient dark:border-none  sm:self-center my-[30px] h-[56px] shadow-sm">
      <Search className="w-[24px] h-[24px] text-light-400" />
      <input
        type="text"
        value={debouncedQuery}
        onChange={handleSearch}
        className="outline-none bg-transparent placeholder:text-light-400 text-light-100 w-full"
        placeholder={`Search a ${placeholder}....`}
      />
    </div>
  );
}
