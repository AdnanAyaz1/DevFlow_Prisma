import QuestionForm from "@/components/forms/QuestionForm";
import React from "react";
import { db } from "@/lib/primsadb";
import { ExtendedQuestion } from "@/types/types";

const EditQuestion = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const question = await db.question.findUnique({
    where: {
      id: id,
    },
    include: {
      author: true,
    },
  });
  return (
    <div>
      <h1 className="h1-bold mb-[36px]">Edit Question</h1>
      <QuestionForm question={question as ExtendedQuestion} />
    </div>
  );
};

export default EditQuestion;
