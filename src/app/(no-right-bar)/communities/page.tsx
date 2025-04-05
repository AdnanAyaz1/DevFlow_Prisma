import { fetchUsers } from "@/app/server-actions/fetchUsers";
import { PaginationComponent } from "@/components/pagination";
import LocalSearch from "@/components/search/LocalSearch";
import Sort from "@/components/sort/Sort";
import { routes } from "@/constants/routes";
import { userSort } from "@/constants/SortOptions";
import { SearchParams } from "@/types/types";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import React from "react";

const page = async ({ searchParams }: SearchParams) => {
  const { sort = "", search = "", page = "1" } = await searchParams;
  const { users, noOfPages, error } = await fetchUsers({
    sort,
    search,
    pageNumber: page,
    pageSize: 9,
  });
  return (
    <div>
      <h1 className="h1-bold">All Users</h1>
      <div className="flex max-sm:flex-col max-sm:gap-2 max-sm:items-start max-sm:justify-start  sm:flex-between my-[20px] gap-6 max-w-[800px]">
        <LocalSearch placeholder="Username" />
        <Sort data={userSort} />
      </div>
      <div className="flex flex-wrap gap-3">
        {error ? (
          <>
            <h1 className=" text-red-500">{error}</h1>
          </>
        ) : (
          <>
            {users && users.length == 0 ? (
              <>
                <p className="body-medium dark:text-light-700">
                  No Users Found
                </p>
              </>
            ) : (
              users.map((user: User, key) => {
                return (
                  <Link
                    href={routes.user_info(user.id)}
                    key={key}
                    className="w-[260px] py-[30px] rounded-[10px] dark:bg-dark-300 border-[1px] dark:border-dark-400 bg-light-850/70 shadow-md border-light-800 flex-center flex-col gap-2"
                  >
                    <Image
                      src={user.image || "/images/person-placeholder.jpeg"}
                      alt="user image"
                      height={100}
                      width={100}
                      className="object-cover rounded-full aspect-square"
                    />
                    <h3 className="h3-bold">{user.name}</h3>
                    <p className="body-regular text-light-500">{user.email}</p>
                  </Link>
                );
              })
            )}
          </>
        )}
      </div>
      {noOfPages && noOfPages > 1 && (
        <PaginationComponent noOfPages={noOfPages} />
      )}
    </div>
  );
};

export default page;
