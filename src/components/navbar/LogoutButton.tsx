"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
const LogoutButton = () => {
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    toast({
      title: "Logged out successfully",
      variant: "success",
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  };

  return (
    <Button
      variant={"outline"}
      className="border-none  shadow-none hover:bg-transparent bg-transparent gap-4 flex justify-start"
      type="submit"
      onClick={handleSignOut}
    >
      <Image
        src={"/icons/logout.svg"}
        alt="logout"
        height={24}
        width={24}
        className="invert dark:invert-0"
      />
      <h3 className="base-medium dark:text-light-900 text-dark-300">Logout</h3>
    </Button>
  );
};

export default LogoutButton;
