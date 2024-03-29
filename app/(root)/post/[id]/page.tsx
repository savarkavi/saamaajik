import CommentForm from "@/components/CommentForm";
import PostCard from "@/components/PostCard";
import { LikesProvider } from "@/context/LikesContext";
import { fetchPost } from "@/lib/controllers/post";
import { fetchUser } from "@/lib/controllers/user";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface Post {
  _id: string;
  totalLikes: number;
  text: string;
  author: {
    _id: string;
    id: string;
    name: string;
    username: string;
    image: string;
    bio: string;
    isBoarded: boolean;
    posts: string[];
    communities: string[];
    createdAt: string;
    updatedAt: string;
  };
  children: string[];
  createdAt: string;
  updatedAt: string;
}

const Post = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.isBoarded) redirect("/onboarding");

  const res = await fetchPost(params.id);
  const replies = res.children.reverse();
  const profileImage = userInfo ? userInfo.image : user.imageUrl;

  const initialCommentsLikesState: Record<string, number> = {};
  res.children.forEach((post: any) => {
    initialCommentsLikesState[post._id] = post.totalLikes;
  });

  return (
    <div className="p-16">
      <LikesProvider initialLikesState={{ [res._id]: res.totalLikes }}>
        <div>
          <PostCard
            image={res.author.image}
            username={res.author.username}
            text={res.text}
            postId={res._id}
            userId={res.author.id}
            isComment={false}
            likesCount={res.totalLikes}
            repliesCount={res.children?.length}
          />
          <CommentForm
            profileImage={profileImage}
            authorId={userInfo._id}
            parentId={res._id}
          />
        </div>
      </LikesProvider>
      <LikesProvider initialLikesState={initialCommentsLikesState}>
        <div className="flex flex-col">
          {replies.map((comment: any) => {
            return (
              <PostCard
                key={comment._id}
                image={comment.author.image}
                username={comment.author.username}
                text={comment.text}
                postId={comment._id}
                userId={comment.author.id}
                isComment={true}
                likesCount={comment.totalLikes}
                repliesCount={comment.children?.length}
              />
            );
          })}
        </div>
      </LikesProvider>
    </div>
  );
};

export default Post;
