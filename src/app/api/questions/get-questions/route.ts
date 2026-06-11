import { FilterQuery } from "mongoose";
import { Question } from "@prisma/client";
import { db } from "@/lib/primsadb";
import { apiResponse, handleApiError } from "@/lib/api-utils";

export async function POST(request: Request) {
  try {
    const Query = await request.json();
    const { pageNumber, pageSize = 3, searchQuery = "", sort = [] } = Query;
    const skip = (Number(pageNumber) - 1) * pageSize;
    const limit = Number(pageSize);

    const filterQuery: FilterQuery<Question> = {};
    if (searchQuery) {
      filterQuery.OR = [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { content: { contains: searchQuery, mode: "insensitive" } },
      ];
    }

    let sortCriteria = {};

    if (sort.includes("newest")) {
      sortCriteria = { createdAt: "desc" };
    } else if (sort.includes("un answered")) {
      filterQuery.answers = { none: {} };
      sortCriteria = { createdAt: "desc" };
    } else if (sort.includes("recommended questions")) {
      sortCriteria = { upVotes: "desc" };
    } else sortCriteria = { createdAt: "asc" };

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

   

    return apiResponse(
      "Questions fetched successfully",
      true,
      200,
      questions,
      noOfPages
    );
  } catch (error) {
    return handleApiError(error);
  }
}
