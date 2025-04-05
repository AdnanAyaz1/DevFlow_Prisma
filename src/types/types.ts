import { Answer, User, Question } from "@prisma/client";


export interface ProcessedSearchParams {
  searchQuery: string;
  filter: string[];
  sort: string[];
  pageNumber: string;
  pageLimit: number;
}

export interface MySearchParams {
  search?: string;
  filter?: string;
  page?: number;
}

export interface ExtendedQuestion extends Question {
  answers: Answer[];
  author: User;
}

export interface ExtendedAnswer extends Answer {
  author?: User;
}

export interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
