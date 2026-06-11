"use server";
import { db } from "@/lib/primsadb";
import { User } from "@prisma/client";
import { FilterQuery, SortOrder } from "mongoose";

interface FetchUsersParams {
  search?: string;
  sort?: string;
  pageSize: number;
  pageNumber: string;
}

export async function fetchUsers({
  search,
  sort,
  pageSize,
  pageNumber,
}: FetchUsersParams) {
  try {
    const skip = (Number(pageNumber) - 1) * pageSize || 0;
    const limit = Number(pageSize);
    const filterQuery: FilterQuery<User> = {};

    if (search) {
      filterQuery.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    type SortCriteria = Record<string, SortOrder>;
    const sortCriteria: SortCriteria = {};

    if (sort === "Highest Reputation") {
      sortCriteria.reputation = "desc";
    } else if (sort === "Most Popular") {
      sortCriteria.posts = "desc";
    } else if (sort === "Newest") {
      sortCriteria.createdAt = "desc";
    } else if (sort === "Oldest") {
      sortCriteria.createdAt = "asc";
    }

    const totalUsers = await db.user.count({
      where: filterQuery,
    });
    const noOfPages = Math.ceil(totalUsers / pageSize);

    const users = await db.user.findMany({
      where: filterQuery,
      orderBy: sortCriteria,
      skip: skip,
      take: limit,
    });

    return { users, noOfPages };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [], error: "Failed to fetch users. Please try again." };
  }
}
