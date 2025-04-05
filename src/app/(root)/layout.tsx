import Navbar from "@/components/navbar";
import LeftSidebar from "@/components/navigation/LeftSidebar";
import RightSidebar from "@/components/navigation/RightSidebar";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dev Overflow",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
  icons: {
    icon: "/images/site-logo.svg",
  },
};

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[1440px] mx-auto max-h-screen overflow-y-clip ">
      <Navbar />
      <div className="flex ">
        <LeftSidebar />
        <section className=" w-[884px] h-[calc(100vh-100px)] overflow-y-auto no-scrollbar max-xs:px-[10px] px-[40px] pt-[65px] dark:bg-dark-100 pb-[33px] ">
          {children}
        </section>
        <RightSidebar />
      </div>
    </div>
  );
};

export default layout;
