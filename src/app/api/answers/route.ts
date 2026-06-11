import { db } from "@/lib/primsadb";
import { apiResponse, handleApiError } from "@/lib/api-utils";

export async function POST(request: Request) {
  const { questionId, authorId, content } = await request.json();
  try {
    const answer = await db.answer.create({
      data: {
        content,
        authorId,
        questionId,
      },
    });
    if (!answer) {
      return apiResponse("Error creating answer", false, 500);
    }

    await db.question.update({
      where: { id: questionId },
      data: {
        answers: {
          connect: { id: answer.id },
        },
      },
    });

    return apiResponse("Answer Submitted", true, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
