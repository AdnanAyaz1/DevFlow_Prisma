import { getDeviconClass } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";

const Tag = ({
  icon = false,
  tag,
  remove = false,
  handleRemove,
  classNameText,
  classNameTag,
}: {
  icon?: boolean;
  tag: string;
  remove?: boolean;
  classNameText?: string;
  classNameTag?: string;
  handleRemove?: () => void;
}) => {
  return (
    <div
      className={twMerge(
        " rounded-lg px-[16px] py-[8px] bg-light-800 dark:bg-dark-400/60  uppercase flex gap-2 h-[29px] items-center w-fit shadow-md",
        classNameTag
      )}
    >
      {icon && <i className={`${getDeviconClass(tag)} text-[14px] `} />}
      <span className={twMerge("text-light-400 subtle-medium", classNameText)}>
        {tag}
      </span>
      {remove && (
        <Image
          src={"/icons/close.svg"}
          alt="remove icon"
          height={15}
          width={15}
          onClick={handleRemove}
          className="invert cursor-pointer"
        />
      )}
    </div>
  );
};

export default Tag;
