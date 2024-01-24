import PostForm from "@/components/PostForm";
import { fetchUser } from "@/lib/controllers/user";
import { currentUser } from "@clerk/nextjs";
import React from "react";

async function CreatePost() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  return (
    <div className="text-white p-16">
      <h1 className="text-2xl font-semibold mb-8">Create Post</h1>
      <PostForm authorId={userInfo._id} />
    </div>
  );
}

export default CreatePost;
