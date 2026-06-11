import { auth } from "@/auth";
import QuestionCard from "./QuestionCard";
import { ExtendedQuestion } from "@/types/types";

const QuestionCards = async ({
  questions,
}: {
  questions: ExtendedQuestion[];
}) => {
  const session = await auth();

  return (
    <div className="mt-[40px] space-y-[24px]">
      {questions && questions.length > 0 ? (
        questions.map((ques: ExtendedQuestion) => (
          <QuestionCard
            key={ques.id}
            question={ques}
            userId={session?.user?.id}
          />
        ))
      ) : (
        <p>No questions found</p>
      )}
    </div>
  );
};

export default QuestionCards;
