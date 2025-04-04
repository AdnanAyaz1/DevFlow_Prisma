import Image from "next/image";
import React from "react";
import Preview from "./editor/Preview";
import Votes from "./vote/Votes";
import { auth } from "@/auth";
import { ExtendedAnswer } from "@/types/types";

const Answers = async ({ answer }: { answer: ExtendedAnswer }) => {
  const formattedContent = answer.content
    .toString()
    .replace(/\\/g, "")
    .replace(/#x20/g, "");
  const session = await auth();
  return (
    <div className="my-9 py-8 mr-2 border-b border-light-400 pb-4">
      {/* Answer Content */}
      <div className="mt-6">
        <div className="flex-between">
          <div className="flex-center gap-2">
            <div className="flex-center gap-2">
              <Image
                src={answer?.author?.image || "/images/person-placeholder.jpeg"}
                alt="user-image"
                height={25}
                width={25}
                className="aspect-square object-cover rounded-full"
              />
              <p className="paragraph-semibold dark:text-light-800">
                {answer?.author?.name}
              </p>
            </div>
            <div className="w-1 h-1 rounded-full bg-light-500"></div>
            <p className="subtle-medium text-light-500">
              answered at <span>{answer.createdAt.toLocaleString()}</span>
            </p>
          </div>
          <div className="flex gap-[10px]">
            <Votes
              answerId={answer.id}
              src={"/icons/upvote.svg"}
              alt="upvote-icon"
              val={answer?.upVotes}
              type="upVote"
              session={session?.user.id as string}
            />
            <Votes
              answerId={answer.id}
              src={"/icons/downvote.svg"}
              alt="downVote-icon"
              val={answer?.downVotes}
              type="downVote"
              session={session?.user.id as string}
            />
          </div>
        </div>
        {/* content */}
        <Preview formattedContent={formattedContent} />
      </div>
    </div>
  );
};

export default Answers;
