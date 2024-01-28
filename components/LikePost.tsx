"use client";

import { likePost } from "@/lib/controllers/post";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";

const LikePost = ({
  likes,
  postId,
  userId,
}: {
  likes: string;
  postId: string;
  userId: string;
}) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (likes.includes(userId)) {
      setIsLiked(true);
    }
  }, [likes, userId]);

  const handleLikePost = async () => {
    const res = await likePost({
      postId: JSON.parse(postId),
      userId: JSON.parse(userId),
    });

    if (res.likes.includes(userId)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <CiHeart
        className={`text-xl cursor-pointer ${isLiked && "bg-blue-500"}`}
        onClick={handleLikePost}
      />
      <span className="text-sm">{JSON.parse(likes)?.length}</span>
    </div>
  );
};

export default LikePost;
