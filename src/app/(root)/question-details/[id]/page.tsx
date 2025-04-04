import { auth } from "@/auth";
import AnswersFetch from "@/components/AnswersFetch";
import Bookmark from "@/components/Bookmark";
import Preview from "@/components/editor/Preview";
import AnswerForm from "@/components/forms/AnswerForm";
import QuestionCardStats from "@/components/Reusable/QuestionCardStats";
import Tag from "@/components/Reusable/Tag";
import Sort from "@/components/sort/Sort";
import Votes from "@/components/vote/Votes";
import { answerSort } from "@/constants/SortOptions";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import React from "react";
import axios from "axios";
import { db } from "@/lib/primsadb";

const QuestionDetails = async ({
  params,
  searchParams,
}: {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ sort: string }>;
}) => {
  const { id } = await params;
  const { sort } = await searchParams;
  const session = await auth();

  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/questions/get-question-byId`,
    {
      questionId: id,
      userId: session?.user.id as string,
    }
  );

  const {
    data: { question },
  } = data;

  if (data.incrementView) {
    question.views += 1;
  }

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id as string,
    },
  });

  const formattedContent = question?.content
    .replace(/\\/g, "")
    .replace(/&#x20;/g, "");

  const stats = [
    {
      icon: "/icons/answers.svg",
      number: question?.answers.length,
      text: "Answers",
    },
    { icon: "/icons/view.svg", number: question?.views, text: "Views" },
  ];

  return (
    <>
      {question && (
        <div>
          {/* question-details Header */}
          <div className="flex-between">
            <div className="flex-center gap-2">
              <Image
                src={
                  question?.author.image || "/images/person-placeholder.jpeg"
                }
                alt="user-image"
                height={25}
                width={25}
                className="object-cover rounded-full aspect-square"
              />
              <p className="paragraph-semibold dark:text-light-700">
                {question?.author.name}
              </p>
            </div>
            <div className="flex gap-[10px]">
              <Votes
                type="upVote"
                src="/icons/upvote.svg"
                alt="upVote"
                val={question?.upVotes}
                session={session?.user.id as string}
                questionId={question?.id}
              />
              <Votes
                type="downVote"
                src="/icons/downvote.svg"
                alt="downVote"
                val={question?.downVotes}
                session={session?.user.id as string}
                questionId={question?.id}
              />
              <Bookmark
                questionId={question?.id}
                bookmarks={user?.bookmarks || []}
                userId={user?.id as string}
              />
            </div>
          </div>
          {/* title */}
          <h1 className="mt-[14px] h2-semibold text-light-900">
            {question?.title}
          </h1>
          {/* stats */}
          <div className="flex mt-[19px] gap-[15px]">
            <div className="flex-center gap-2">
              <Image
                src={"/icons/time.svg"}
                alt="clock"
                height={15}
                width={15}
              />
              <p className="small-regular text-dark-400 dark:text-light-700">
                asked{" "}
                {formatDistanceToNow(new Date(question?.createdAt as Date))} ago
              </p>
            </div>

            {stats.map((stat, i) => (
              <QuestionCardStats
                key={i}
                number={stat.number as number}
                icon={stat.icon}
                text={stat.text}
              />
            ))}
          </div>
          {/* preview */}
          <Preview formattedContent={formattedContent as string} />
          {/* tags */}
          <div className="mt-[14px] flex gap-4">
            {question?.tags.map((tag: string, i: number) => (
              <Tag tag={tag} key={i} icon={true} />
            ))}
          </div>
          {/* Answers */}

          {question?.answers.length > 0 && (
            <section className="my-[50px] ">
              {/* Answer Controls */}
              <div className="flex-between">
                <h1 className="paragraph-medium">
                  <span className="primary-text-gradient">
                    {question?.answers.length} Answers
                  </span>
                </h1>
                <Sort data={answerSort} />
                {/* <AnswersSort /> */}
              </div>

              <AnswersFetch sort={sort} questionId={question?.id} />
            </section>
          )}

          {/*Submit Answer */}
          <section className="my-[50px]">
            <AnswerForm
              authorId={session?.user.id as string}
              questionId={JSON.parse(JSON.stringify(question?.id))}
            />
          </section>
        </div>
      )}
    </>
  );
};

export default QuestionDetails;
