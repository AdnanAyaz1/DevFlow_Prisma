"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const LoadMore = ({ datalength }: { datalength: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [index, setIndex] = useState(Number(searchParams.get("index")) || 3);
  const handleLoadMore = () => {
    const params = new URLSearchParams(searchParams.toString());
    setIndex((pre) => pre + 3);
    const newIndex = index + 3;
    params.set("index", String(newIndex));
    router.push(`?${params.toString()}`, { scroll: false });
  };
  const handleShowLess = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("index", String(3));
    router.push(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div>
      {datalength > 3 && Number(searchParams.get("index")) < datalength && (
        <Button
          className="primary-gradient text-white mx-auto my-6 flex-center"
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      )}
      {Number(searchParams.get("index")) >= datalength && datalength ? (
        <Button
          className="primary-gradient text-white mx-auto my-6 flex-center"
          onClick={handleShowLess}
        >
          Show Less
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LoadMore;
