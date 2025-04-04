"use server";

import { revalidatePath } from "next/cache";
import Question from "@/models/question";
import dbConnect from "@/lib/database-connection";
import { routes } from "@/constants/routes";

export async function updateQuestionViews(userId: string, questionId: string) {
  await dbConnect();

  try {
    let question = await Question.findById(questionId);

    if (!question) {
      return { error: "Question not found" };
    }

    if (userId !== question.author.toString()) {
      const hasViewed = question.viewedBy.includes(userId);

      if (!hasViewed) {
        question = await Question.findByIdAndUpdate(questionId, {
          $inc: { views: 1 },
          $push: { viewedBy: userId },
        });

        // Revalidate the path so the UI updates
        revalidatePath(routes.question_details(questionId));
      }
    }

    return { success: true, question };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
