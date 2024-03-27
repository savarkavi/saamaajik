import { fetchPosts } from "@/lib/controllers/post";
import PostCard from "@/components/PostCard";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/controllers/user";
import { redirect } from "next/navigation";
import { LikesProvider } from "@/context/LikesContext";

export default async function Home() {
  const res = await fetchPosts({ page: 1, pageSize: 20 });
  const user = await currentUser();

  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.isBoarded) redirect("/onboarding");

  const initialLikesState: Record<string, number> = {};
  res.forEach((post: any) => {
    initialLikesState[post._id] = post.totalLikes;
  });

  return (
    <LikesProvider initialLikesState={initialLikesState}>
      <div className="px-4 py-8 md:p-16">
        <h1 className="text-4xl font-semibold mb-16 text-white">Home</h1>
        <div>
          {res.length === 0 ? (
            <div>No Posts found</div>
          ) : (
            <div className="flex flex-col gap-10">
              {res.map((post) => {
                return (
                  <PostCard
                    key={post._id}
                    image={post.author.image}
                    username={post.author.username}
                    text={post.text}
                    postId={post._id}
                    userId={post.author.id}
                    isComment={false}
                    likesCount={post.totalLikes}
                    repliesCount={post.children?.length}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </LikesProvider>
  );
}
