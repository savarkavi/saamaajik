import PostForm from "@/components/PostForm";
import React from "react";

const CreatePost = () => {
  return (
    <div className="text-white p-16">
      <h1 className="text-2xl font-semibold mb-8">Create Post</h1>
      <PostForm />
    </div>
  );
};

export default CreatePost;
