

export type ServerActionResponse<T = undefined> = {
  message: string;
  success: boolean;
  status: number;
  data?: T;
};

export const serverActionResponse = <T>(
  message: string,
  success: boolean,
  status: number,
  data?: T
): ServerActionResponse<T> => {
  return {
    message,
    success,
    status,
    data,
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
