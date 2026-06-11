import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface EmptyStateProps {
  image: string;
  title: string;
  description: string;
  buttontext: string;
  buttonUrl: string;
}

const EmptyState = ({
  image,
  title,
  description,
  buttontext,
  buttonUrl,
}: EmptyStateProps) => {
  return (
    <div className="flex-center py-16">
      <div className="  space-y-4 text-center max-w-[351px]">
        <Image
          src={image}
          alt="empty-question"
          width={300}
          height={300}
          className=" object-cover w-[269px] h-[200px]  mx-auto"
        />
        <h1 className="h2-bold">{title}</h1>
        <p className="body-regular text-light-700">{description}</p>
        <Button className="rounded-lg w-[173px] h-[45px] primary-gradient flex-center mx-auto paragraph-semibold">
          <Link href={buttonUrl}>{buttontext}</Link>
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
