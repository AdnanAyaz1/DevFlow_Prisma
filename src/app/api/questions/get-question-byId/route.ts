import { NextResponse } from "next/server";
import { db } from "@/lib/primsadb";
import { apiResponse, handleApiError } from "@/lib/api-utils";

export async function POST(req: Request) {
  let incrementView = false;
  try {
    const { userId, questionId } = await req.json();
    const question = await db.question.findUnique({
      where: {
        id: questionId,
      },
      include: {
        author: true,
        answers: true,
      },
    });

    if (!question) {
      return apiResponse("Question not found", false, 404, null);
    }

    if (userId) {
      if (userId !== question?.authorId) {
        const hasViewed = question?.viewedBy?.includes(userId);
        if (!hasViewed) {
          await db.question.update({
            where: { id: questionId },
            data: {
              views: { increment: 1 },
              viewedBy: { push: userId },
            },
          });
          incrementView = true;
        }
      }
    }

    return apiResponse("Question fetched successfully", true, 200, {
      question,
      incrementView,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
