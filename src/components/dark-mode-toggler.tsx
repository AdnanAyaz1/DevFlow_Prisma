"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export function DarkModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size="icon">
          {/* <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0  text-orange-500" /> */}
          <Image
            src="/icons/sun.svg"
            alt="sun"
            width={23}
            height={23}
            className="h-[1.2rem] w-[1.2rem] dark:hidden"
          />
          <Image
            src="/icons/moon.png"
            alt="sun"
            width={23}
            height={23}
            className=" h-[1.2rem] w-[1.2rem]  hidden dark:block  "
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="dark:bg-dark-secondaryRight bg-white"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="hover:bg-light-500 dark:hover:bg-dark-400 cursor-pointer"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="hover:bg-light-500 dark:hover:bg-dark-400 cursor-pointer"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="hover:bg-light-500 dark:hover:bg-dark-400 cursor-pointer"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
