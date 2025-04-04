"use server";

import { db } from "@/lib/primsadb";
import { Tag } from "@prisma/client";
import { FilterQuery } from "mongoose";

interface FetchTagsParams {
  search?: string;
  sort?: string;
  pageSize: number;
  pageNumber: string;
}

export async function fetchTags({
  search,
  sort,
  pageSize,
  pageNumber,
}: FetchTagsParams) {
  try {
    const skip = (Number(pageNumber) - 1) * pageSize || 0;
    const limit = Number(pageSize);
    const filterQuery: FilterQuery<Tag> = {};

    if (search) {
      filterQuery.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    let sortCriteria = {};
    if (sort) {
      if (sort === "Most Popular") sortCriteria = { questions: "desc" };
      if (sort === "Newest") sortCriteria = { createdAt: "desc" };
      if (sort === "Least Popular") sortCriteria = { questions: "asc" };
      if (sort === "Oldest") sortCriteria = { createdAt: "asc" };
    }
    const totalTags = await db.tag.count({
      where: filterQuery,
    });
    const noOfPages = Math.ceil(totalTags / pageSize);
    const tags = await db.tag.findMany({
      where: filterQuery,
      skip: skip,
      take: limit,
      orderBy: sortCriteria,
    });
    return { tags, noOfPages };
  } catch (error) {
    console.error("Error fetching tags:", error);
    return { tags: [], error: "Failed to fetch tags. Please try again." };
  }
}
