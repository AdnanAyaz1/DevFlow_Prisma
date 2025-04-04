"use server";
import {
  serverActionResponse,
  handleActionError,
  ServerActionResponse,
} from "@/lib/action-utils";
import { db } from "@/lib/primsadb";

export async function handleQuestionBookmark(
  userId: string,
  questionId: string
) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return serverActionResponse("User not found", false, 404);
    }

    if (user.bookmarks.includes(questionId)) {
      const newBookmarks = user.bookmarks.filter(
        (bookmark: string) => bookmark !== questionId
      );
      user.bookmarks = newBookmarks;
      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          bookmarks: newBookmarks,
        },
      });
      return serverActionResponse(
        "Question removed from bookmarks",
        true,
        200,
        user.bookmarks
      );
    } else {
      user.bookmarks.push(questionId);

      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          bookmarks: user.bookmarks,
        },
      });
      return serverActionResponse(
        "Question added to bookmarks",
        true,
        200,
        user.bookmarks
      );
    }
  } catch (error) {
    return handleActionError(error);
  }
}
