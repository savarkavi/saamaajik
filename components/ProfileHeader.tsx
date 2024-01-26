import Image from "next/image";

type userInfoProps = {
  userInfo: {
    image: string;
    name: string;
    username: string;
    bio: string;
  };
};

const ProfileHeader = async ({ userInfo }: userInfoProps) => {
  return (
    <div className="flex flex-col gap-5 text-white border-b border-gray-500 pb-12">
      <div className="flex gap-6 items-center">
        <div className="relative w-20 h-20 rounded-full">
          <Image
            src={userInfo.image}
            alt="profile image"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">{userInfo.name}</h2>
          <h2 className="text-sm">{`@${userInfo.username}`}</h2>
        </div>
      </div>
      <p>{userInfo.bio}</p>
    </div>
  );
};

export default ProfileHeader;
