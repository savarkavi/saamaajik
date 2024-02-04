"use client";

import Image from "next/image";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import UserSettings from "@/components/UserSettings";

type UserProfileProps = {
  username: string;
  image: string;
  userId: string;
};

export default function UserProfile({
  username,
  image,
  userId,
}: UserProfileProps) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center gap-3 hover:bg-neutral-600 py-2 px-4 rounded-xl cursor-pointer">
            <div className="relative w-12 h-12 rounded-full">
              <Image
                src={image}
                alt="profile photo"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <h2 className="text-white font-semibold">{username}</h2>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[999] bg-black text-white w-[200px] h-full">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-4">
            <Link href={`/profile/${userId}`} className="w-full">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-4">
            <Link href={`/profile/settings`} className="w-full">
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-4">
            <SignOutButton>
              <span className="w-full">Logout</span>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
