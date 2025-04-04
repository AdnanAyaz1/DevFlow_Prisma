import QuestionCards from "@/components/cards/QuestionCards";
import HomeTagFilter from "@/components/filter/HomeTagFilter";
import { PaginationComponent } from "@/components/pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { routes } from "@/constants/routes";
import { SearchParams } from "@/types/types";
import axios from "axios";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParams) {
  const awaitedSearchParams = await searchParams;
  const searchQuery = awaitedSearchParams?.search?.toLowerCase() || "";
  const filter = awaitedSearchParams?.filter?.toLowerCase().split(",") || [];
  const sort = awaitedSearchParams?.sort?.toLowerCase().split(",") || [];
  const pageNumber = awaitedSearchParams?.page || "1";
  const pageLimit = 5;

  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/questions/get-questions`,
    {
      searchQuery,
      filter,
      pageNumber,
      pageLimit,
      sort,
    }
  );

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex-between">
          <h1 className="h1-bold">All Questions</h1>
          <Link
            href={routes.ask_question}
            className="rounded-lg w-[173px] h-[45px] primary-gradient flex-center"
          >
            <span className="paragraph-semibold text-white ">
              Ask a Question
            </span>
          </Link>
        </div>
        <LocalSearch placeholder="Question" />
        <HomeTagFilter />
        <QuestionCards questions={data.data} />
      </div>
      {data.noOfPages > 1 && <PaginationComponent noOfPages={data.noOfPages} />}
    </main>
  );
}
