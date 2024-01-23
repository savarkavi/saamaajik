"use client";

import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { useState } from "react";

const Footer = () => {
  const [isActive, setIsActive] = useState("Home");

  const handleActiveLinkChange = (activeLink: string) => {
    setIsActive(activeLink);
  };

  return (
    <div className="bg-stone-950 fixed h-[80px] bottom-0 w-full md:hidden flex items-center justify-center p-4">
      <div className="flex items-center justify-between w-full">
        {sidebarLinks.map((link) => {
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`text-white flex flex-col items-center gap-2 p-2 cursor-pointer hover:text-blue-700 transition-all ${
                isActive === link.label && "bg-blue-500 rounded-lg"
              }`}
              onClick={() => handleActiveLinkChange(link.label)}
            >
              <div className="text-lg">{link.icon}</div>
              <span className="hidden sm:block text-sm">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
