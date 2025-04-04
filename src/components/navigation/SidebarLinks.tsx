"use client";

import { links } from "@/constants/Links";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SheetClose } from "../ui/sheet";

const SidebarLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6">
      {links.map((link, i) => {
        const isActive =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;
        const sideBarLink = (
          <Link
            href={link.route}
            className={`flex gap-4 p-4 ${isActive ? "primary-gradient rounded-lg" : ""} ${isMobileNav ? "" : " max-lg:w-fit"} `}
            key={i}
          >
            <Image
              src={link.icon}
              alt="link icon"
              width={24}
              height={24}
              className={`${isActive ? "" : "invert-colors"}`}
            />
            <h3
              className={`${isActive ? "invert-colors" : ""} base-bold line-clamp-1 ${isMobileNav ? "" : "max-lg:hidden"} `}
            >
              {link.link}
            </h3>
          </Link>
        );
        return isMobileNav ? (
          <SheetClose key={i} asChild>
            {sideBarLink}
          </SheetClose>
        ) : (
          <div key={i}>{sideBarLink}</div>
        );
      })}
    </div>
  );
};

export default SidebarLinks;
