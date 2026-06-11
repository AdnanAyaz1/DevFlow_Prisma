import Image from "next/image";
import React from "react";

interface ErrorStateProps {
  image: string;
  title: string;
  description: string;
}

const ErrorState = ({ image, title, description }: ErrorStateProps) => {
  return (
    <div className="flex-center py-16">
      <div className="  space-y-4  text-center max-w-[351px]">
        <Image
          src={image}
          alt="empty-question"
          width={300}
          height={300}
          className=" object-cover w-[269px] h-[200px]  mx-auto"
        />
        <h1 className="h2-bold">{title}</h1>
        <p className="body-regular text-light-700">{description}</p>
      </div>
    </div>
  );
};

export default ErrorState;
