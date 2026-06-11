import { db } from "@/lib/primsadb";
import { apiResponse, handleApiError } from "@/lib/api-utils";

export async function PATCH(req: Request) {
  try {
    const { id, type, user, responseType } = await req.json();

    const questionOrAnswer = await db[
      responseType as "question" | "answer"
    ].findUnique({
      where: {
        id: id,
      },
      include: {
        voteCastedBy: true,
      },
    });

    if (!questionOrAnswer) {
      return apiResponse("Question not found", false, 404, null);
    }

    const hasVoted = questionOrAnswer.voteCastedBy.find(
      (vote) => vote.voteCasterId === user
    );

    if (hasVoted) {
      if (hasVoted.type === type) {
        return apiResponse(
          `You have already ${type}d this ${responseType}`,
          false,
          400,
          null
        );
      }

      const updateVote = await db.voteCaster.update({
        where: {
          id: hasVoted.id,
        },
        data: {
          type: type,
        },
      });

      const updateCondition = {
        where: {
          id: id,
        },
        data: {
          upVotes: {
            increment: type === "upVote" ? 1 : -1,
          },
          downVotes: {
            increment: type === "downVote" ? 1 : -1,
          },
        },
      };

      responseType === "question"
        ? await db.question.update(updateCondition)
        : await db.answer.update(updateCondition);

      return apiResponse("Vote updated successfully", true, 200);
    } else {
      const vote = await db.voteCaster.create({
        data: {
          type,
          voteCasterId: user,
          questionId: responseType === "question" ? id : null,
          answerId: responseType === "answer" ? id : null,
        },
      });

      const updateCondition = {
        where: {
          id: id,
        },
        data: {
          upVotes: {
            increment: type === "upVote" ? 1 : 0,
          },
          downVotes: {
            increment: type === "downVote" ? 1 : 0,
          },
        },
      };

      responseType === "question"
        ? await db.question.update(updateCondition)
        : await db.answer.update(updateCondition);
    }
    return apiResponse("Vote casted successfully", true, 200);
  } catch (error) {
    return handleApiError(error);
  }
}
