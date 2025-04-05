"use server";

import {
  handleActionError,
  ServerActionResponse,
  serverActionResponse,
} from "@/lib/action-utils";
import { db } from "@/lib/primsadb";
import { ExtendedQuestion } from "@/types/types";
import { Prisma } from "@prisma/client";

interface GetTagsProps {
  id: string;
  search?: string;
  sort?: string;
}

export const getTags = async ({
  id,
  search,
  sort,
}: GetTagsProps): Promise<ServerActionResponse<ExtendedQuestion>> => {
  try {
    const tag = await db.tag.findUnique({
      where: {
        id,
      },
    });

    if (!tag) {
      return serverActionResponse("Tag not found", false, 404);
    }

    const filterQuery: Prisma.QuestionWhereInput = {};
    if (search) {
      filterQuery.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ];
    }

    let sortCriteria = {};

    if (sort == "Newest") {
      sortCriteria = { createdAt: "desc" };
    } else if (sort == "Oldest") {
      sortCriteria = { createdAt: "asc" };
    } else if (sort == "Most Popular") {
      sortCriteria = { upVotes: "desc" };
    } else if (sort == "Un Answered") {
      filterQuery.answers = {
        none: {},
      };
      sortCriteria = { createdAt: "asc" };
    }

    const questions = await db.question.findMany({
      where: {
        ...filterQuery,
        tags: {
          has: tag?.title,
        },
      },
      include: {
        author: true,
        answers: true,
      },
      orderBy: sortCriteria,
    });
    return serverActionResponse(
      "Questions Fetched",
      true,
      200,
      questions,
      1,
      tag
    );
  } catch (error) {
    return handleActionError(error);
  }
};
