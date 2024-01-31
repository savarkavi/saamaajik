import { fetchActivity } from "@/lib/controllers/post";
import { fetchUser } from "@/lib/controllers/user";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";

const Activity = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.isBoarded) redirect("/onboarding");

  const { commentsData, likesData } = await fetchActivity(userInfo._id);

  return (
    <div className="p-16">
      <h1 className="text-white text-2xl font-semibold">Activity</h1>
      <div className="mt-16">
        <Tabs defaultValue="replies" className="w-full">
          <TabsList className="w-full flex justify-start gap-16 bg-neutral-900 text-white">
            <TabsTrigger value="replies">Replies</TabsTrigger>
            <TabsTrigger value="likes">Likes</TabsTrigger>
          </TabsList>
          <TabsContent value="replies" className="flex flex-col gap-6 mt-16">
            {commentsData.reverse().map((reply) => {
              return (
                <Link
                  href={`/post/${reply.parent}`}
                  key={reply._id}
                  className="w-full p-4 flex gap-2 text-white items-start bg-neutral-900 rounded-xl"
                >
                  <div className="relative w-12 h-12 rounded-full mr-4">
                    <Image
                      src={reply.author.image}
                      alt="profile photo"
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      <div className="text-blue-500 font-semibold">
                        {reply.author.username}
                      </div>
                      <p>replied to your post.</p>
                    </div>
                    <p className="text-sm text-gray-400">{reply.text}</p>
                  </div>
                </Link>
              );
            })}
          </TabsContent>
          <TabsContent value="likes" className="flex flex-col gap-6">
            {likesData.reverse().map((user) => {
              return (
                <div
                  // href={`/post/${r.parent}`}
                  key={user._id}
                  className="w-full p-4 flex gap-2 text-white items-center bg-neutral-900 rounded-xl"
                >
                  <div className="relative w-12 h-12 rounded-full mr-4">
                    <Image
                      src={user.image}
                      alt="profile photo"
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      <div className="text-blue-500 font-semibold">
                        {user.username}
                      </div>
                      <p>liked your post.</p>
                    </div>
                    {/* <p className="text-sm text-gray-400">{reply.text}</p> */}
                  </div>
                </div>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Activity;
