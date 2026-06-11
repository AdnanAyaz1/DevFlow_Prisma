import React from "react";
import Link from "next/link";
import { routes } from "@/constants/routes";

const AuthButtons = () => {
  return (
    <div className="flex flex-col gap-3">
      <Link
        href={routes.signIn}
        className=" bg-light-800 hover:bg-light-800/70 px-3 dark:bg-dark-400  dark:hover:bg-dark-400/70 rounded-lg  py-[12px] text-center"
      >
        <span className="primary-text-gradient body-semibold ">Log In</span>
      </Link>
      <Link
        href={routes.signUp}
        className=" bg-light-700 hover:bg-light-700/70 px-3 dark:bg-dark-300 dark:hover:bg-dark-300/70 rounded-lg py-[12px] text-center"
      >
        <span className="body-semibold">Sign Up</span>
      </Link>
    </div>
  );
};

export default AuthButtons;
