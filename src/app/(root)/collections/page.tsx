import { auth } from "@/auth";
import LoadMore from "@/components/Reusable/LoadMore";

import SavedQuestions from "@/components/SavedQuestions";
import { db } from "@/lib/primsadb";
import React from "react";
import { SearchParams } from "@/types/types";
import { redirect } from "next/navigation";
import { toast } from "@/hooks/use-toast";
const page = async ({ searchParams }: SearchParams) => {
  const awaitedParams = await searchParams;
  const index = awaitedParams.index;
  const session = await auth();
  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
  if (!user) {
    toast({
      title: "Unauthorized",
      description: "Please Sign in to view your saved questions",
      variant: "destructive",
    });
    redirect("/");
  }
  const userId = user ? user?.id : "";
  const bookmarks = user?.bookmarks;

  return (
    <div>
      <h1 className="h1-bold">Saved Questions</h1>
      <div className="mt-[50px] ">
        {session?.user && user?.bookmarks?.length > 0 ? (
          <div className="space-y-[30px]">
            {user.bookmarks.slice(0, Number(index) || 3).map((id: string) => (
              <SavedQuestions
                questionId={id}
                key={id}
                userId={userId}
                bookmarks={bookmarks}
              />
            ))}
          </div>
        ) : (
          <h1>No Saved Questions</h1>
        )}
      </div>
      {session?.user && <LoadMore datalength={user?.bookmarks?.length} />}
    </div>
  );
};

export default page;
