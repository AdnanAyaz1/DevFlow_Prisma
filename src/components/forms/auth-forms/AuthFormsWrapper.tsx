import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import SocialAuthButtons from "./SocialAuthButtons";

const AuthFormsWrapper = ({
  type,
  children,
}: {
  type: string;
  children: ReactNode;
}) => {
  const switchingRouteText =
    type === "Sign In" ? "Don't have an account?" : "Already have an account?";
  const switchingRouteLink = type === "Sign In" ? "Sign Up" : "Sign In";
  const switchingRouteLinkPath = type === "Sign In" ? "/sign-up" : "/sign-in";

  return (
    <main
      className="rounded-lg max-sm:px-4 max-sm:py-8 px-[32px] py-[40px] bg-light-800 max-w-[520px] w-full shadow-auth-form-shadow-light dark:bg-dark-400/70 dark:border-[1px] border-dark-300
  "
    >
      {/* header */}
      <div className="flex-between">
        <div className="space-y-[9px]">
          <h2 className="h2-bold">{type}</h2>
          <p className="paragraph-regular dark:text-light-400">
            to continue to DevFlow
          </p>
        </div>
        <Image
          src={"/icons/site-logo.png"}
          alt="DevFlow logo"
          width={50}
          height={50}
        />
      </div>
      {/* fields */}
      {children}
      {/* Switching Route Between Sign in and Sig Up */}
      <p className="paragraph-regular text-center mt-[25px]">
        {switchingRouteText}{" "}
        <Link
          href={switchingRouteLinkPath}
          className="text-primary-500 font-semibold"
        >
          {switchingRouteLink}
        </Link>
      </p>
      {/* Socila Auth Buttons */}
      <SocialAuthButtons />
    </main>
  );
};

export default AuthFormsWrapper;
