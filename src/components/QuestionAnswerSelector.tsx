"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const QuestionAnswerSelector = () => {
  const [isActive, setIsActive] = useState("questions");
  const router = useRouter();
  const searchParams = useSearchParams();
  const toggleTab = (tab: "questions" | "answers") => {
    setIsActive(tab);
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);
    params.delete("index");
    router.push(`?${params}`, { scroll: false });
  };
  return (
    <div className="my-[40px] flex rounded-xl body-medium">
      <div
        className={`rounded-tl-xl rounded-bl-xl px-[24px] py-[12px] cursor-pointer ${isActive == "questions" ? "dark:bg-dark-400          bg-primary-100" : "dark:bg-dark-300 bg-light-700"} `}
        onClick={() => toggleTab("questions")}
      >
        {" "}
        <span
          className={` ${isActive == "questions" ? "primary-text-gradient" : "text-gray-500"}`}
        >
          Questions
        </span>
      </div>
      <div
        className={`rounded-tr-xl rounded-br-xl px-[24px] py-[12px] cursor-pointer ${isActive == "answers" ? "dark:bg-dark-400  bg-primary-100" : "dark:bg-dark-300 bg-light-700"} `}
        onClick={() => toggleTab("answers")}
      >
        {" "}
        <span
          className={` ${isActive == "answers" ? "primary-text-gradient" : "text-gray-500"}`}
        >
          Answers
        </span>
      </div>
    </div>
  );
};

export default QuestionAnswerSelector;
