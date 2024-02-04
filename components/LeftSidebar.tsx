"use client";

import { sidebarLinks } from "@/constants";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiLogout } from "react-icons/ci";

const LeftSidebar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <div className="bg-[#111111] sticky left-0 top-[80px] w-[350px] h-[calc(100vh-80px)] hidden md:flex flex-col px-8 py-4 justify-between">
      <div className="flex flex-col gap-8 mt-12">
        {sidebarLinks.map((link) => {
          return (
            <Link
              href={
                link.route === "/profile"
                  ? `${link.route}/${userId}`
                  : link.route
              }
              key={link.label}
              className={`text-white flex items-center gap-3 p-3 text-lg cursor-pointer hover:text-blue-700 transition-all ${
                (pathname === link.route ||
                  pathname.startsWith(link.route + "/")) &&
                "bg-blue-500 rounded-lg hover:text-white"
              }`}
            >
              <div className="text-xl">{link.icon}</div>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="">
        <SignedIn>
          <SignOutButton>
            <div className="flex items-center gap-4 cursor-pointer w-[100px]">
              <CiLogout className="text-white text-xl" />
              <span className="text-white text-lg">Logout</span>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  );
};

export default LeftSidebar;
