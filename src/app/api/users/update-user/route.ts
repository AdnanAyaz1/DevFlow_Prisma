import { apiResponse, handleApiError } from "@/lib/api-utils";
import { db } from "@/lib/primsadb";

export async function PATCH(req: Request) {
  const data = await req.json();
  const { username, ...rest } = data;
  try {
    await db.user.update({
      where: { id: data.id },
      data: rest,
    });
    return apiResponse("User Updated", true, 200);
  } catch (error) {
    return handleApiError(error);
  }
}
