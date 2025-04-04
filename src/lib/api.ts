import { IQuestion } from "../models/question";
import { IUser } from "@/models/user";
import { fetchHandler } from "./handlers/fetchHandler";
import {
  ExtendedQuestion,
  ProcessedSearchParams,
  UserType,
} from "@/types/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export const api = {
  users: {
    registor: (userData: Partial<IUser>) =>
      fetchHandler(`${API_BASE_URL}/users/sign-up`, {
        method: "POST",
        body: JSON.stringify(userData),
      }),
    log_in: (userData: Partial<IUser>) =>
      fetchHandler(`${API_BASE_URL}/users/sign-in`, {
        method: "POST",
        body: JSON.stringify(userData),
      }),
    update_user: (userData: Partial<UserType>) =>
      fetchHandler(`${API_BASE_URL}/users/update-user`, {
        method: "PATCH",
        body: JSON.stringify(userData),
      }),
  },
  questions: {
    ask_question: (data: Partial<ExtendedQuestion>) =>
      fetchHandler(`${API_BASE_URL}/questions`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    edit_question: (data: Partial<ExtendedQuestion & { oldTags: string[] }>) =>
      fetchHandler(`${API_BASE_URL}/questions`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    get_question: (data: ProcessedSearchParams) =>
      fetchHandler(`${API_BASE_URL}/questions/get-questions`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    get_question_byID: (data: { questionId: string; userId: string }) =>
      fetchHandler(`${API_BASE_URL}/questions/get-question-byId`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
  answers: {
    post_answer: (data: {
      questionId: string;
      authorId: string;
      content: string;
    }) =>
      fetchHandler(`${API_BASE_URL}/answers`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    generate_ai_answer: (data: { questionId: string; authorId: string }) =>
      fetchHandler(`${API_BASE_URL}/answers/ai-answer`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
  votes: {
    update_vote: (data: {
      id: string;
      type: string;
      user: string;
      responseType: string;
    }) =>
      fetchHandler(`${API_BASE_URL}/votes`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
  },
  global: {
    global_search: (data: { search: string; filter: string }) =>
      fetchHandler(`${API_BASE_URL}/globalSearch`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
};
