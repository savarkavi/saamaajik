import ProfileHeader from "@/components/ProfileHeader";
import { fetchUser } from "@/lib/controllers/user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AiFillMessage } from "react-icons/ai";
import { IoPeopleSharp } from "react-icons/io5";
import { FaTag } from "react-icons/fa";
import TabContent from "@/components/TabContent";

const Profile = async ({ params }: { params: { id: string } }) => {
  const userData = await fetchUser(params.id);

  const userInfo = {
    image: userData.image,
    name: userData.name,
    username: userData.username,
    bio: userData.bio,
  };

  return (
    <div className="p-16">
      <ProfileHeader userInfo={userInfo} />
      <div className="mt-8">
        <Tabs defaultValue="posts" className="w-full rounded-xl">
          <TabsList className="w-full flex justify-between rounded-xl bg-neutral-900 py-6">
            <TabsTrigger
              value="posts"
              className="w-[100px] bg-neutral-900 text-white p-3"
            >
              <div className="flex items-center gap-3">
                <AiFillMessage />
                <span>Posts</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="replies"
              className="w-[100px] bg-neutral-900 text-white p-3"
            >
              <div className="flex items-center gap-3">
                <IoPeopleSharp />
                <span>Replies</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="tagged"
              className="w-[100px] bg-neutral-900 text-white p-3"
            >
              <div className="flex items-center gap-3">
                <FaTag />
                <span>Tagged</span>
              </div>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-8 h-full">
            <TabContent userId={params.id} tabType="posts" />
          </TabsContent>
          <TabsContent value="replies" className="mt-8">
            <TabContent userId={params.id} tabType="replies" />
          </TabsContent>
          <TabsContent value="tagged" className="mt-8">
            <TabContent userId={params.id} tabType="tagged" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
