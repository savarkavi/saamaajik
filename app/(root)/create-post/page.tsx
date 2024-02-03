import PostForm from "@/components/PostForm";
import { fetchUser } from "@/lib/controllers/user";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function CreatePost() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.isBoarded) redirect("/onboarding");

  return (
    <div className="text-white px-4 py-8 md:p-16">
      <h1 className="text-2xl font-semibold mb-8">Create Post</h1>
      <PostForm authorId={userInfo?._id} />
    </div>
  );
}

export default CreatePost;
