import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const QuestionCardStats = ({
  icon,
  number,
  text,
}: {
  icon: string;
  number: number;
  text: string;
}) => {
  return (
    <div className="flex-center gap-1 dark:text-light-800">
      <Image
        src={icon}
        alt="stat-icon"
        height={18}
        width={18}
        className="object-cover"
      />
      <p className="small-medium">{formatNumber(number)}</p>
      <p className="small-regular">{text}</p>
    </div>
  );
};

export default QuestionCardStats;
