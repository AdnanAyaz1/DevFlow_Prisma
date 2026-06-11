"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

const SocialAuthButtons = () => {
  const [isLoading, setIsLoading] = useState("");
  const handleAuth = async (provider: string) => {
    if (provider == "google") {
      setIsLoading("google");
    } else setIsLoading("github");
    await signIn(provider, {
      callbackUrl: "/",
      redirect: false,
    });
  };

  return (
    <div className="mt-[36px] max-sm:flex-col  flex gap-[10px]">
      <Button
        className="flex-1 py-[15px] bg-white dark:bg-dark-400 rounded-lg flex-center gap-2 h-[48px] dark:hover:bg-dark-400/70 active:scale-95 duration-150 transition-all ease-in-out"
        disabled={isLoading === "google"}
        onClick={() => handleAuth("google")}
        variant={"secondary"}
      >
        {isLoading === "google" && (
          <ReloadIcon className="mr-2 size-4 animate-spin" />
        )}
        <Image
          src={"/icons/google.svg"}
          alt="Google Logo"
          width={24}
          height={24}
        />
        <p className="paragraph-medium">Login with Google</p>
      </Button>
      <Button
        className="flex-1 py-[15px] h-[48px] bg-white dark:bg-dark-400 dark:hover:bg-dark-400/70 rounded-lg flex-center gap-2 active:scale-95 duration-150 transition-all ease-in-out"
        onClick={() => handleAuth("github")}
        disabled={isLoading === "github"}
        variant={"secondary"}
      >
        {isLoading === "github" && (
          <ReloadIcon className="mr-2 size-4 animate-spin" />
        )}
        <Image
          src={"/icons/github.svg"}
          alt="Github Logo"
          width={24}
          height={24}
          className="dark:invert"
        />
        <p className="paragraph-medium">Login with Github</p>
      </Button>
    </div>
  );
};

export default SocialAuthButtons;
