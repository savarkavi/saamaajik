import Image from "next/image";
import { CiLocationArrow1 } from "react-icons/ci";
import { AiOutlineMessage } from "react-icons/ai";
import { TiArrowForwardOutline } from "react-icons/ti";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import LikePost from "./LikePost";
import { fetchPost } from "@/lib/controllers/post";

type PostCardProps = {
  image: string;
  username: string;
  text: string;
  postId: string;
  userId: string;
  likes: string[];
  isComment: boolean;
};

const PostCard = async ({
  image,
  username,
  text,
  postId,
  isComment,
  userId,
  likes,
}: PostCardProps) => {
  const user = await currentUser();
  if (!user) return null;

  return (
    <div
      className={`rounded-xl w-full max-w-[800px] flex gap-6 text-white ${
        isComment ? "bg-transparent p-0 min-h-[180px]" : "p-4 bg-neutral-900"
      }`}
    >
      <div className="flex flex-col items-center gap-2">
        <Link
          href={`/profile/${userId}`}
          className="relative w-16 h-16 rounded-full shrink-0"
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
          <p>{text}</p>
        </div>
        <div className="flex items-center text-white gap-12 mt-6">
          <LikePost
            likes={JSON.stringify(likes)}
            postId={JSON.stringify(postId)}
            userId={JSON.stringify(user.id)}
          />
          <Link href={`/post/${postId}`}>
            <AiOutlineMessage className="text-xl cursor-pointer" />
          </Link>
          <TiArrowForwardOutline className="text-xl cursor-pointer" />
          <CiLocationArrow1 className="text-xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
