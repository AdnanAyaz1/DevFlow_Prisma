"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import axios from "axios";

const Votes = ({
  src,
  val,
  alt,
  type,
  session,
  questionId,
  answerId,
}: {
  src: string;
  alt: string;
  val: number;
  type: "upVote" | "downVote";
  session: string;
  answerId?: string;
  questionId?: string;
}) => {
  const router = useRouter(); // ✅ Initialize router
  const [loading, setLoading] = useState(false); // ✅ Track loading state

  const handleVote = async () => {
    if (!session) {
      toast({
        title: "Action Denied",
        description: "You need to be logged in to perform this action",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/votes`,
        {
          id: questionId ? (questionId as string) : (answerId as string),
          type,
          user: session,
          responseType: questionId ? "question" : "answer",
        }
      );

      if (res.data.success) {
        toast({
          title: "Success",
          description: res.data.message,
          variant: "success",
        });
        router.refresh(); // ✅ Revalidate the page
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      // Revert optimistic update on failure
    
      toast({
        title: "Failure",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex-center gap-[6px] cursor-pointer"
      onClick={loading ? undefined : handleVote}
    >
      <Image src={src} alt={alt} height={15} width={15} />
      <p className="subtle-medium text-light-900 flex-center rounded-sm bg-dark-400 size-[16px]">
        {loading ? (
          <span className="inline-block h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
        ) : (
          val
        )}
      </p>
    </div>
  );
};

export default Votes;
