"use server";

import {
  handleActionError,
  ServerActionResponse,
  serverActionResponse,
} from "@/lib/action-utils";
import { db } from "@/lib/primsadb";
import { Prisma, Tag } from "@prisma/client";

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
}: FetchTagsParams): Promise<ServerActionResponse<Tag>> {
  try {
    const skip = (Number(pageNumber) - 1) * pageSize || 0;
    const limit = Number(pageSize);
    const filterQuery: Prisma.TagWhereInput = {};

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
    return serverActionResponse("Tags Fetched", true, 200, tags, noOfPages);
  } catch (error) {
    return handleActionError(error);
  }
}
