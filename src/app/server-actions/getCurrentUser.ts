"use server";

import { auth } from "@/auth";
import {
  handleActionError,
  ServerActionResponse,
  serverActionResponse,
} from "@/lib/action-utils";
import { db } from "@/lib/primsadb";
import { User } from "@prisma/client";

export const getCurrentUser = async (): Promise<ServerActionResponse<User>> => {
  try {
    const session = await auth();
    if (!session?.user) {
      return serverActionResponse("UnAuthenticated", false, 401);
    }
    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      return serverActionResponse("User not found", false, 404);
    }

    return serverActionResponse("User found", true, 200, [user]);
  } catch (error) {
    return handleActionError(error);
  }
};
