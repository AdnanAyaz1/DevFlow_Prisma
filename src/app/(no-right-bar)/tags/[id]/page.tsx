import { getCurrentUser } from "@/app/server-actions/getCurrentUser";
import { getTags } from "@/app/server-actions/getTags";
import QuestionCard from "@/components/cards/QuestionCard";
import ErrorState from "@/components/ErrorState";
import LocalSearch from "@/components/search/LocalSearch";
import Sort from "@/components/sort/Sort";
import { tagDetailsSort } from "@/constants/SortOptions";
import { getDeviconClass } from "@/lib/utils";
import { ExtendedQuestion } from "@/types/types";
import React from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    search?: string;
    sort?: string;
  }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  // Await the params
  const { id } = await params;
  const { search, sort } = await searchParams;

  // the server action mostly returns an array on generic type of i am also getting user in the form of an array
  const { data: userArray } = await getCurrentUser();

  const {
    data: questions,
    success,
    message,
    tag,
    noOfPages,
  } = await getTags({ id, search, sort });

  if (!success) {
    return (
      <ErrorState
        image={"/images/error.png"}
        title={"Oops! Something went wrong"}
        description={message}
      />
    );
  }

  const user = (userArray && userArray[0]) || null;

  return (
    <div>
      <div className="flex items-center gap-2 ">
        <h1 className="h1-bold order-2">
          {tag?.title}
        </h1>
        <i
          className={`${getDeviconClass(tag?.title as string)} text-[20px] order-1 `}
        />
      </div>
      <h3 className="body-medium dark:text-light-700 my-6">
        {tag?.description}
      </h3>
      <div className="flex max-sm:flex-col sm:flex-between max-w-[800px] my-6 gap-3">
        <LocalSearch placeholder="Question title,description" />
        <Sort data={tagDetailsSort} />
      </div>
      <div className="space-y-3">
        {questions &&
          questions.map((ques: ExtendedQuestion, i: number) => (
            <QuestionCard
              question={ques}
              key={i}
              bookmark={true}
              userId={user?.id}
              bookmarks={user?.bookmarks}
            />
          ))}
      </div>
    </div>
  );
}
