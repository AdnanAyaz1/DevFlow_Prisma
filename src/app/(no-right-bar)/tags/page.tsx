import { fetchTags } from "@/app/server-actions/fetchTags";
import TagCard from "@/components/cards/TagCard";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import { PaginationComponent } from "@/components/pagination";
import LocalSearch from "@/components/search/LocalSearch";
import Sort from "@/components/sort/Sort";
import { routes } from "@/constants/routes";
import { tagSort } from "@/constants/SortOptions";
import { SearchParams } from "@/types/types";
import { Tag } from "@prisma/client";
import Link from "next/link";
import React from "react";

const page = async ({ searchParams }: SearchParams) => {
  const { search, sort, page } = await searchParams;
  const pageSize = 9;

  const { data, message, success, status, noOfPages } = await fetchTags({
    search,
    sort,
    pageSize,
    pageNumber: page,
  });

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <h1 className="h1-bold">Tags</h1>
        <div className="flex max-sm:flex-col max-sm:gap-2 max-sm:items-start max-sm:justify-start sm:flex-between my-[20px] gap-6 max-w-[800px]">
          <LocalSearch placeholder="tag" />
          <Sort data={tagSort} />
        </div>

        {!success ? (
          <ErrorState
            image="/images/error.png"
            title={"Something went wrong"}
            description={message}
          />
        ) : data && data?.length > 0 ? (
          <div className="mt-[49px] flex flex-wrap gap-[10px]">
            {data.map((tag: Tag) => (
              <Link key={tag.id} href={routes.tags_info(tag.id)}>
                <TagCard tag={tag as Tag} />
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            image="/images/emptyState.png"
            title="No tags found"
            description="No tags found"
            buttontext="Ask a Question"
            buttonUrl={routes.ask_question}
          />
        )}
      </div>
      {noOfPages && noOfPages > 1 && (
        <PaginationComponent noOfPages={noOfPages} />
      )}
    </div>
  );
};

export default page;
