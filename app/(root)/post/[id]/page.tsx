import CommentForm from "@/components/CommentForm";
import PostCard from "@/components/PostCard";
import { fetchPost } from "@/lib/controllers/post";
import { fetchUser } from "@/lib/controllers/user";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Post = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.isBoarded) redirect("/onboarding");

  const res = await fetchPost(params.id);
  const replies = res.children.reverse();
  const profileImage = userInfo ? userInfo.image : user.imageUrl;

  return (
    <div className="p-16">
      <PostCard
        image={res.author.image}
        username={res.author.username}
        text={res.text}
        postId={JSON.stringify(res._id)}
        userId={res.author.id}
        isComment={false}
      />
      <CommentForm
        profileImage={profileImage}
        authorId={JSON.stringify(userInfo._id)}
        parentId={JSON.stringify(res._id)}
      />
      <div className="flex flex-col">
        {replies.map((comment: any) => {
          return (
            <PostCard
              key={comment._id}
              image={comment.author.image}
              username={comment.author.username}
              text={comment.text}
              postId={JSON.stringify(comment._id)}
              userId={comment.author.id}
              isComment={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Post;
