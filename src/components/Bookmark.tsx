// In your Bookmark component:
"use client";
import { handleQuestionBookmark } from "@/app/server-actions/handleBookmark";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Bookmark = ({
  questionId,
  bookmarks,
  userId,
  // You might not need userId and bookmarks as props anymore
}: {
  questionId: string;
  bookmarks: string[];
  userId: string;
}) => {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(
    bookmarks?.includes(questionId)
  );

  const handleBookmark = async () => {
    if (!userId) {
      toast({
        title: "Action Denied",
        description: "You need to be Logged in to perform this action ",
        variant: "destructive",
      });
      return;
    }

    setIsBookmarked(!isBookmarked); // Optimistic update

    try {
      const res = await handleQuestionBookmark(userId, questionId); // Use session.user.id
      if (res.success) {
        toast({
          title: "Success",
          description: res.message,
          variant: "success",
        });
        router.refresh();
      } else {
        setIsBookmarked(isBookmarked); // Revert on error
        toast({
          title: "Failure",
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      setIsBookmarked(isBookmarked); // Revert on error
      toast({
        title: "Failure",
        description: `${error instanceof Error ? error.message : ""}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="cursor-pointer" onClick={handleBookmark}>
      {isBookmarked ? (
        <Image
          src={"/icons/bookmarked.svg"}
          alt="bookmarked-icon"
          height={15}
          width={15}
          className="aspect-square min-w-[15px] min-h-[15px]"
        />
      ) : (
        <Image
          src={"/icons/bookmark.svg"}
          alt="bookmark-icon"
          height={15}
          width={15}
          className="aspect-square"
        />
      )}
    </div>
  );
};

export default Bookmark;
