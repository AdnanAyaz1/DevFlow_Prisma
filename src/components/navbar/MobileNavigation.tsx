import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Logo from "./Logo";
import SidebarLinks from "../navigation/SidebarLinks";
import AuthButtons from "./AuthButtons";
import LogoutButton from "./LogoutButton";
import { auth } from "@/auth";

export default async function MobileNavigation() {
  const session = await auth();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src={"/icons/hamburger.svg"}
          alt="menu"
          width={24}
          height={24}
          className="w-[30px] h-[30px] cursor-pointer invert-colors md:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="flex flex-col bg-light-900 dark:bg-dark-500 overflow-y-scroll custom-scrollbar"
      >
        <SheetHeader>
          <Logo />
          <SheetTitle className="sr-only">Are you absolutely sure?</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col flex-1 justify-between gap-10   mt-[66px] pb-[33px]">
          {/* Links */}
          <SidebarLinks isMobileNav={true} />
          {/* Auth Buttons */}
          {session?.user ? <LogoutButton /> : <AuthButtons />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
