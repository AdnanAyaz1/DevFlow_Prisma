"use server";

import { handleActionError, serverActionResponse } from "@/lib/action-utils";
import { db } from "@/lib/primsadb";
import bcrypt from "bcryptjs";

export const updatePassword = async (password: string, token: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await db.user.update({
      where: {
        id: token,
      },
      data: {
        password: hashedPassword,
      },
    });

    return serverActionResponse("Password updated successfully", true, 200);
  } catch (error) {
    return handleActionError(error);
  }
};
