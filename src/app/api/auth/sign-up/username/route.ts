import { apiResponse, handleApiError } from "@/lib/api-utils";
import { db } from "@/lib/primsadb";

export async function POST(req: Request) {
  const { username } = await req.json();
  console.log("username", username);
  try {
    const existingUser = await db.user.findUnique({
      where: {
        name: username,
      },
    });

    if (existingUser) {
      return apiResponse(`${username} is not available.`, false, 409);
    }

    return apiResponse(`${username} is available.`, true, 200);
  } catch (error) {
    return handleApiError(error);
  }
}
