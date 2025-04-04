import { routes } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={routes.home} className="flex gap-2">
      <Image
        src={"/icons/site-logo.png"}
        alt="logo"
        width={40}
        height={40}
        className="w-[31px] h-[31px]"
      />
      <h2 className="h2-medium text-dark-400 dark:text-light-800">
        Dev<span className="text-primary-500">Flow</span>
      </h2>
    </Link>
  );
};

export default Logo;
