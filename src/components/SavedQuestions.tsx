import { db } from "@/lib/primsadb";
import React from "react";
import QuestionCard from "./cards/QuestionCard";
import { ExtendedQuestion } from "@/types/types";

const SavedQuestions = async ({
  questionId,
  userId,
  bookmarks,
}: {
  questionId: string;
  userId: string;
  bookmarks: string[];
}) => {
  const question = await db.question.findUnique({
    where: {
      id: questionId,
    },
    include: {
      author: true,
      answers: true,
    },
  });
  return (
    <QuestionCard
      question={question as ExtendedQuestion}
      bookmark={true}
      userId={userId}
      bookmarks={bookmarks}
    />
  );
};

export default SavedQuestions;
