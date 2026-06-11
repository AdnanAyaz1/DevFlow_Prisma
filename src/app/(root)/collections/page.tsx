import LoadMore from "@/components/Reusable/LoadMore";
import SavedQuestions from "@/components/SavedQuestions";
import React from "react";
import { SearchParams } from "@/types/types";
import EmptyState from "@/components/EmptyState";
import { routes } from "@/constants/routes";
import { getCurrentUser } from "@/app/server-actions/getCurrentUser";
import { User } from "@prisma/client";
import { ServerActionResponse } from "@/lib/action-utils";

const page = async ({ searchParams }: SearchParams) => {
  const awaitedParams = await searchParams;
  const index = awaitedParams.index; // for loading more

  const { data } = (await getCurrentUser()) as ServerActionResponse<User>;
  const user = data?.[0];
  if (!user) {
    return (
      <p className="h3-bold font-space-grotesk text-primary-500">
        Please Login to view your saved questions
      </p>
    );
  }
  const userId = user ? user?.id : "";
  const bookmarks = user?.bookmarks;

  return (
    <div>
      <h1 className="h1-bold">Saved Questions</h1>
      <div className="mt-[50px] ">
        {bookmarks && bookmarks?.length > 0 ? (
          <div className="space-y-[30px]">
            {bookmarks.slice(0, Number(index) || 3).map((id: string) => (
              <SavedQuestions
                questionId={id}
                key={id}
                userId={userId}
                bookmarks={bookmarks}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title={"No Saved Questions"}
            description={"Save questions to your collections for quick access."}
            buttontext={"Ask a Question"}
            buttonUrl={routes.ask_question}
            image={"/images/emptyState.png"}
          />
        )}
      </div>
      {user && <LoadMore datalength={user?.bookmarks?.length} />}
    </div>
  );
};

export default page;
