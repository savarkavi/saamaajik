import Image from "next/image";
import Link from "next/link";

type NewUserCardProps = {
  image: string;
  name: string;
  username: string;
  userId: string;
};

const NewUserCard = ({ image, name, username, userId }: NewUserCardProps) => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full">
          <Image
            src={image}
            alt="profile photo"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="text-white flex flex-col text-sm">
          <h2 className="text-base font-semi-bold">{name}</h2>
          <h2>{`@${username}`}</h2>
        </div>
      </div>
      <Link
        href={`profile/${userId}`}
        className="bg-blue-500 py-2 px-4 rounded-xl text-white text-sm"
      >
        View
      </Link>
    </div>
  );
};

export default NewUserCard;
