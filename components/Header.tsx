import { currentUser, SignedIn, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";
import UserProfile from "@/components/UserProfile";
import { fetchUser } from "@/lib/controllers/user";

export default async function Header() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  return (
    <div className="w-full bg-[#111111] h-[80px] py-4 px-2 sm:px-8 flex items-center justify-between sticky top-0 z-[99]">
      <Link href="/" className="flex items-center gap-4 justify-between">
        <Image src="/assets/app-logo.png" alt="logo" width={28} height={28} />
        <h1 className={`text-white font-semibold text-lg `}>Saamaajik</h1>
      </Link>
      <div className="flex items-center gap-4">
        <div className="flex gap-2 items-center text-white md:hidden">
          <SignedIn>
            <SignOutButton>
              <CiLogout className="text-2xl" />
            </SignOutButton>
          </SignedIn>
        </div>
        <UserProfile
          username={userInfo.username}
          image={userInfo.image}
          userId={userInfo.id}
        />
      </div>
    </div>
  );
}
