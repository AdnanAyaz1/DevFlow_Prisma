import React from "react";
import Answers from "./Answers";
import { db } from "@/lib/primsadb";
import { ExtendedAnswer } from "@/types/types";

const AnswersFetch = async ({
  sort,
  questionId,
}: {
  sort: string;
  questionId: string;
}) => {
  let sortCriteria = {};
  if (sort == "Newest") {
    sortCriteria = { createdAt: "desc" };
  } else if (sort == "Oldest") {
    sortCriteria = { createdAt: "asc" };
  } else if (sort == "Most Popular") {
    sortCriteria = [{ upVotes: "desc" }, { downVotes: "asc" }];
  } else if (sort == "Least Popular") {
    sortCriteria = [{ upVotes: "asc" }, { downVotes: "desc" }];
  }
  const answers = await db.answer.findMany({
    where: { questionId },
    orderBy: sortCriteria,
    include: {
      author: true,
    },
  });

  return (
    <div className="max-h-[700px] overflow-y-auto custom-scrollbar">
      {answers.map((answer: ExtendedAnswer, i: number) => (
        <Answers key={i} answer={answer} />
      ))}
    </div>
  );
};

export default AnswersFetch;
