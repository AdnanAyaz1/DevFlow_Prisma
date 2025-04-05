"use server";

import { db } from "@/lib/primsadb";
import { serverActionResponse, handleActionError, ServerActionResponse } from "@/lib/action-utils";
import { Prisma, Question } from "@prisma/client";


export async function getQuestions(params: {
  pageNumber: number;
  pageSize?: number;
  searchQuery?: string;
  sort?: string[];
}): Promise<ServerActionResponse<Question>> {
  try {
    const { pageNumber, pageSize = 3, searchQuery = "", sort = [] } = params;
    const skip = (Number(pageNumber) - 1) * pageSize;
    const limit = Number(pageSize);

    const filterQuery: Prisma.QuestionWhereInput = {};
    if (searchQuery) {
      filterQuery.OR = [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { content: { contains: searchQuery, mode: "insensitive" } },
      ];
    }

    let sortCriteria: Prisma.QuestionOrderByWithRelationInput[] = [];

    if (sort.includes("newest")) {
      sortCriteria.push({ createdAt: "desc" });
    }
    if (sort.includes("un answered")) {
      filterQuery.answers = { none: {} };
      sortCriteria.push({ createdAt: "desc" });
    }
    if (sort.includes("recommended questions")) {
      sortCriteria.push({ upVotes: "desc" });
    }
    if (sort.length === 0) {
      sortCriteria.push({ createdAt: "asc" });
    }

    const totalQuestions = await db.question.count({
      where: filterQuery,
    });

    const noOfPages = Math.ceil(totalQuestions / pageSize);

    const questions = await db.question.findMany({
      where: filterQuery,
      skip,
      take: limit,
      orderBy: sortCriteria,
      include: {
        author: true,
        answers: true,
      },
    });


    return serverActionResponse(
      "Questions fetched successfully",
      true,
      200,
      questions,
      noOfPages
    );
  } catch (error) {
    return handleActionError(error);
  }
}
