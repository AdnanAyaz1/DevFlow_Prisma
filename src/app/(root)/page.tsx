import QuestionCards from "@/components/cards/QuestionCards";
import HomeTagFilter from "@/components/filter/HomeTagFilter";
import { PaginationComponent } from "@/components/pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { routes } from "@/constants/routes";
import { ExtendedQuestion, SearchParams } from "@/types/types";
import Link from "next/link";
import { getQuestions } from "../server-actions/getQuestions";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";

export default async function Home({ searchParams }: SearchParams) {
  const awaitedSearchParams = await searchParams;
  const searchQuery = awaitedSearchParams?.search?.toLowerCase() || "";
  const filter = awaitedSearchParams?.filter?.toLowerCase().split(",") || [];
  const sort = awaitedSearchParams?.sort?.toLowerCase().split(",") || [];
  const pageNumber = awaitedSearchParams?.page || "1";
  const pageLimit = 5;

  // const { data } = await axios.post(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/questions/get-questions`,
  //   {
  //     searchQuery,
  //     filter,
  //     pageNumber,
  //     pageLimit,
  //     sort,
  //   }
  // );

  const { data, noOfPages, success, message } = await getQuestions({
    pageNumber: Number(pageNumber),
    pageSize: pageLimit,
    searchQuery,
    sort,
  });

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex-between max-sm:flex-col gap-3">
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
        {success ? (
          data && data?.length > 0 ? (
            <QuestionCards questions={data as ExtendedQuestion[]} />
          ) : (
            <EmptyState
              title={"There are no questions yet"}
              description={
                "Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
              }
              buttontext={"Ask a Question"}
              buttonUrl={routes.ask_question}
              image={"/images/emptyState.png"}
            />
          )
        ) : (
          <ErrorState
            image={"/images/error.png"}
            title={"Something went wrong"}
            description={`We couldn't fetch questions. ${message}. Please try again later.`}
          />
        )}
      </div>
      {noOfPages && noOfPages > 1 ? (
        <PaginationComponent noOfPages={noOfPages} />
      ) : null}
    </main>
  );
}
