"use client";

import { sidebarLinks } from "@/constants";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";

const LeftSidebar = () => {
  const [isActive, setIsActive] = useState("Home");

  const handleActiveLinkChange = (activeLink: string) => {
    setIsActive(activeLink);
  };

  return (
    <div className="bg-stone-950 sticky left-0 top-[80px] w-[250px] h-[calc(100vh-80px)] hidden md:flex flex-col px-8 py-4 justify-between">
      <div className="flex flex-col gap-8 mt-12">
        {sidebarLinks.map((link) => {
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`text-white flex items-center gap-3 p-3 text-lg cursor-pointer hover:text-blue-700 transition-all ${
                isActive === link.label && "bg-blue-500 rounded-lg"
              }`}
              onClick={() => handleActiveLinkChange(link.label)}
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
