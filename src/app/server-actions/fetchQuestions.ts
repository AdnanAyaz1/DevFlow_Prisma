"use server";

import Question from "@/models/question";
import dbConnect from "@/lib/database-connection";
import { QuestionType } from "@/types/types";
import { FilterQuery } from "mongoose";

export async function fetchQuestions({
  skip,
  limit,
  searchQuery = "",
  sort = [],
}: {
  skip: number;
  limit: number;
  searchQuery?: string;
  sort?: string[];
}) {
  try {
    await dbConnect();

    const filterQuery: FilterQuery<QuestionType> = {};
    if (searchQuery) {
      filterQuery.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortCriteria = {};
    if (sort.includes("newest")) {
      sortCriteria = { createdAt: -1 };
    } else if (sort?.includes("un answered")) {
      filterQuery.answers = [];
      sortCriteria = { createdAt: -1 };
    } else if (sort?.includes("recommended questions")) {
      sortCriteria = { upVotes: -1 };
    } else {
      sortCriteria = { createdAt: 1 };
    }

    const questions = await Question.find(filterQuery)
      .skip(skip)
      .limit(limit)
      .sort(sortCriteria)
      .populate("author");

    return { success: true, questions };
  } catch (error) {
    console.error("Error fetching questions:", error);
    return {
      success: false,
      message: "Failed to fetch questions. Please try again later.",
    };
  }
}
