"use server";
import { db } from "@/lib/primsadb";

export const getUser = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    console.log(user);
    return user;
  } catch (error) {
    return null;
  }
};
