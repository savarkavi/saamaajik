import Image from "next/image";
import { CiHeart, CiLocationArrow1 } from "react-icons/ci";
import { AiOutlineMessage } from "react-icons/ai";
import { TiArrowForwardOutline } from "react-icons/ti";

type PostCardProps = {
  image: string;
  username: string;
  text: string;
};

const PostCard = ({ image, username, text }: PostCardProps) => {
  return (
    <div className="bg-stone-900 p-4 rounded-xl w-full max-w-[800px] flex gap-6">
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-16 h-16 rounded-full shrink-0">
          <Image
            src={image}
            alt="profile photo"
            fill
            className="rounded-full object-contain"
          />
        </div>
        <div className="w-[1px] bg-stone-500 h-full"></div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold">{username}</h2>
        <p>{text}</p>
        <div className="flex items-center text-stone-500 gap-4 mt-6">
          <CiHeart className="text-xl" />
          <AiOutlineMessage className="text-xl" />
          <TiArrowForwardOutline className="text-xl" />
          <CiLocationArrow1 className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
