"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Tag from "../Reusable/Tag";

const tags = ["Newest", "Recommended Questions", "Un Answered"];

const HomeTagFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const filter = searchParams.get("sort");
    if (filter) {
      const tagList = filter.split(",");
      setSelectedTags(tagList);
    }
  }, [searchParams]);

  const toggleTagSelection = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((item) => item !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newSelectedTags);

    const params = new URLSearchParams(searchParams.toString());
    if (newSelectedTags.length > 0) {
      params.set("sort", newSelectedTags.join(","));
    } else {
      params.delete("sort");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex gap-4 ">
      {tags.map((tag, i) => (
        <div key={i} onClick={() => toggleTagSelection(tag)}>
          <Tag
            tag={tag}
            icon={false}
            classNameTag={`cursor-pointer ${
              selectedTags.includes(tag) ? "dark:bg-dark-400" : " "
            } h-[42px]`}
            classNameText={`body-medium text-[16px] ${
              selectedTags.includes(tag)
                ? "primary-text-gradient"
                : "text-light-400"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default HomeTagFilter;
