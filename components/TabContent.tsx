import { fetchPostsByUser } from "@/lib/controllers/post";
import PostCard from "./PostCard";

type TabProps = {
  userId: string;
  tabType: string;
};

const TabContent = async ({ userId, tabType }: TabProps) => {
  const userPosts = await fetchPostsByUser({
    userId: userId,
  });

  console.log(userPosts);

  if (tabType === "posts") {
    if (userPosts.length === 0)
      return <div className="text-white text-2xl">No posts to show</div>;
    return (
      <div className="flex flex-col gap-8">
        {userPosts.map((post: any) => {
          return (
            <PostCard
              key={post._id}
              image={post.author.image}
              username={post.author.username}
              text={post.text}
              postId={JSON.stringify(post._id)}
              userId={post.author.id}
              isComment={false}
            />
          );
        })}
      </div>
    );
  }

  if (tabType === "replies") {
    return <div>replies</div>;
  }

  if (tabType === "tagged") {
    return <div>tagged</div>;
  }
};

export default TabContent;
