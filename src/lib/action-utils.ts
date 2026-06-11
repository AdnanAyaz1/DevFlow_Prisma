import { Tag } from "@prisma/client";

export type ServerActionResponse<T = undefined> = {
  message: string;
  success: boolean;
  status: number;
  data?: T[];
  noOfPages?: number;
  tag?: Tag;
};

export const serverActionResponse = <T>(
  message: string,
  success: boolean,
  status: number,
  data?: T[],
  noOfPages?: number,
  tag?: Tag
): ServerActionResponse<T> => {
  return {
    message,
    success,
    status,
    data,
    noOfPages,
    tag,
  };
};

export const handleActionError = <T>(
  error: unknown
): ServerActionResponse<T> => {
  if (error instanceof Error) {
    return serverActionResponse(error.message, false, 500);
  }
  return serverActionResponse("An unexpected error occurred", false, 500);
};
