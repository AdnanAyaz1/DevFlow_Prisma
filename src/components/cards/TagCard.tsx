import React from "react";
import Tag from "../Reusable/Tag";
import { Tag as PrismaTag } from "@prisma/client";

const TagCard = ({ tag }: { tag: PrismaTag }) => {
  return (
    <div className="px-[30px] py-[40px] flex flex-col rounded-lg bg-light-850/70 dark:bg-dark-300 w-[260px] h-[243px] shadow-md">
      <Tag tag={tag.title} icon={true} />
      {/* desc */}
      <div className="flex justify-between flex-col flex-1">
        <div className="my-[18px] line-clamp-4">{tag.description}</div>
        <p className="small-medium text-light-500">
          <span className="body-semibold primary-text-gradient">
            {tag.questions}+
          </span>
          <span className="ml-2">Questions</span>
        </p>
      </div>
    </div>
  );
};

export default TagCard;
