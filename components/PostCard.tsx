import Image from "next/image";
import { CiLocationArrow1 } from "react-icons/ci";
import { AiOutlineMessage } from "react-icons/ai";
import { TiArrowForwardOutline } from "react-icons/ti";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import LikePost from "./LikePost";
import { fetchUser } from "@/lib/controllers/user";

type PostCardProps = {
  image: string;
  username: string;
  text: string;
  postId: string;
  userId: string;
  isComment: boolean;
  likesCount: number;
  repliesCount: number;
};

const PostCard = async ({
  image,
  username,
  text,
  postId,
  isComment,
  userId,
  likesCount,
  repliesCount,
}: PostCardProps) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  return (
    <div
      className={`rounded-xl w-full max-w-[800px] flex gap-6 text-white ${
        isComment ? "bg-transparent p-0 min-h-[180px]" : "p-4 bg-[#111111]"
      }`}
    >
      <div className="flex flex-col items-center gap-2">
        <Link
          href={`/profile/${userId}`}
          className="relative w-10 h-10 sm:w-16 sm:h-16 rounded-full shrink-0"
        >
          <Image
            src={image}
            alt="profile photo"
            fill
            className="rounded-full object-cover"
          />
        </Link>
        <div className="w-[1px] bg-stone-500 h-full"></div>
      </div>
      <div className={`flex flex-col gap-6`}>
        <div className="flex flex-col gap-4">
          <Link href={`/profile/${userId}`} className="text-sm font-semibold">
            {username}
          </Link>
          <p className="text-sm sm:text-base">{text}</p>
        </div>
        <div className="flex items-center text-white gap-12 mt-6">
          <LikePost
            postId={postId}
            userId={userInfo._id}
            likesCount={likesCount}
          />
          <Link href={`/post/${postId}`} className="flex items-center gap-2">
            <AiOutlineMessage className="text-xl cursor-pointer" />
            <span className="text-sm">{repliesCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
