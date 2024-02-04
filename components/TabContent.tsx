import { fetchPostsByUser } from "@/lib/controllers/post";
import PostCard from "./PostCard";
import { LikesProvider } from "@/context/LikesContext";

type TabProps = {
  userId: string;
  tabType: string;
};

const TabContent = async ({ userId, tabType }: TabProps) => {
  const userPosts = await fetchPostsByUser({
    userId: userId,
  });

  const userParentPosts = userPosts.filter((post: any) => !post.parent);
  const userRepliesPosts = userPosts.filter((post: any) => post.parent);

  console.log(userParentPosts);
  console.log(userRepliesPosts);

  // const userReplies = await fetchUserReplies(userId);
  // console.log(userReplies);

  const initialParentLikesState = {};
  userParentPosts.forEach((post: any) => {
    initialParentLikesState[post._id] = post.totalLikes;
  });

  const initialRepliesLikesState = {};
  userRepliesPosts.forEach((post: any) => {
    initialRepliesLikesState[post._id] = post.totalLikes;
  });

  if (tabType === "posts") {
    if (userParentPosts.length === 0)
      return <div className="text-white text-2xl">No posts to show</div>;

    return (
      <LikesProvider initialLikesState={initialParentLikesState}>
        <div className="flex flex-col gap-8">
          {userParentPosts.map((post: any) => {
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
      </LikesProvider>
    );
  }

  if (tabType === "replies") {
    if (userRepliesPosts.length === 0)
      return <div className="text-white text-2xl">No replies to show</div>;

    return (
      <LikesProvider initialLikesState={initialRepliesLikesState}>
        <div className="flex flex-col gap-8">
          {userRepliesPosts.map((post: any) => {
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
      </LikesProvider>
    );
  }
};

export default TabContent;
