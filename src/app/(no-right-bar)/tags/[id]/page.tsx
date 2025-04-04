import { auth } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import LocalSearch from "@/components/search/LocalSearch";
import Sort from "@/components/sort/Sort";
import { tagDetailsSort } from "@/constants/SortOptions";
import { db } from "@/lib/primsadb";
import { ExtendedQuestion } from "@/types/types";
import { Question } from "@prisma/client";
import { FilterQuery, SortOrder } from "mongoose";
import React from "react";

const page = async ({
  params,
  searchParams,
}: {
  searchParams: {
    search: string;
    sort: string;
  };
  params: { id: string };
}) => {
  const { id } = params;
  const session = await auth();
  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
  const { search, sort } = searchParams;
  const tag = await db.tag.findUnique({
    where: {
      id,
    },
  });
  const filterQuery: FilterQuery<Question> = {};
  if (search) {
    filterQuery.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }
  type SortCriteria = Record<string, SortOrder>;
  const sortCriteria: SortCriteria = {};
  if (sort == "Newest") {
    sortCriteria.createdAt = "desc";
  } else if (sort == "Oldest") {
    sortCriteria.createdAt = "asc";
  } else if (sort == "Most Popular") {
    sortCriteria.upVotes = "desc";
  } else if (sort == "Un Answered") {
    filterQuery.answers = [];
    sortCriteria.createdAt = "asc";
  }
  const questions = await db.question.findMany({
    where: {
      ...filterQuery,
      tags: {
        has: tag?.title,
      },
    },
    include: {
      author: true,
      answers: true,
    },
    orderBy: sortCriteria,
  });

  return (
    <div>
      <h1 className="h1-bold">
        {tag?.title.toLowerCase() === "js" ? "JavaScript" : tag?.title}
      </h1>
      <h3 className="body-medium dark:text-light-700 my-6">
        {tag?.description}
      </h3>
      <div className="flex max-sm:flex-col  sm:flex-between max-w-[800px] my-6 gap-3">
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
};

export default page;
