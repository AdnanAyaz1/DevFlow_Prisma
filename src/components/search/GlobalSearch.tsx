"use client";
import React, { useEffect, useRef, useState } from "react";
import GlobalSearchInput from "../GlobalSearchInput";
import GlobalSearchFilter from "../filter/GlobalSearchFilter";
import { Question, Tag, User } from "@prisma/client";
import Image from "next/image";
import { routes } from "@/constants/routes";
import axios from "axios";
import { useRouter } from "next/navigation";

const isUser = (result: Question | Tag | User): result is User => {
  return (result as User).name !== undefined;
};

const GlobalSearch = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Question");
  const [results, setResults] = useState<Question[] | Tag[] | User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (result: Question | Tag | User) => {
    setIsOpen(false);
    const isUserResult = isUser(result);
    const route = isUserResult
      ? routes.user_info(result.id)
      : filter === "Question"
        ? routes.question_details(result.id)
        : routes.tags_info(result.id);
    router.push(route);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.post("/api/globalSearch", { search, filter });
        setResults(res.data.data);
        console.log(res.data.data);
        setIsOpen(true);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (search !== "") {
      fetchData();
    }
  }, [search, filter]);

  return (
    <div
      className="flex-1 max-w-[600px] relative"
      ref={dropdownRef}
      onClick={() => setIsOpen(true)}
    >
      <GlobalSearchInput value={search} onChange={setSearch} />
      {isOpen && (
        <div className="mt-3 bg-light-800 shadow-md dark:bg-dark-300 p-[25px] z-50 absolute w-full rounded-xl">
          <GlobalSearchFilter value={filter} onChange={setFilter} />
          <div className="w-full h-[1px] bg-light-500"></div>
          <div className="p-[25px]">
            <h3 className="base-bold mb-[25px]">Top Match</h3>
            <div className="space-y-[26px]">
              {loading ? (
                <p className="text-sm text-light-500">Loading...</p>
              ) : results.length > 0 ? (
                results.map((result, i) => {
                  const isUserResult = isUser(result);

                  return (
                    <div
                      key={i}
                      className="flex gap-3 hover:bg-light-700 dark:hover:bg-dark-500/30 p-2 rounded-md cursor-pointer"
                      onClick={() => handleClick(result)}
                    >
                      <Image
                        src={"/icons/tag.svg"}
                        alt="icon"
                        height={18}
                        width={18}
                        className="invert dark:invert-0"
                      />
                      <div className="space-y-1">
                        <p className="paragraph-semibold">
                          {isUserResult ? result.name : result.title}
                        </p>
                        <p className="text-light-500 text-sm">{filter}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="body-medium text-sm text-light-500">
                  Nothing Found
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
