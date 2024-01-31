"use client";

import { getLikesData, likePost } from "@/lib/controllers/like";
import React, { useEffect, useState } from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

type LikesParams = {
  user: string;
  post: string;
};

const LikePost = ({
  postId,
  userId,
  likesCount,
}: {
  postId: string;
  userId: string;
  likesCount: number;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesData, setLikesData] = useState<LikesParams[]>([]);

  useEffect(() => {
    const fetchLikesData = async () => {
      const res = await getLikesData();

      console.log(res);

      if (res && res?.length > 0) {
        setLikesData(res);
      }
    };

    fetchLikesData();
  }, [postId]);

  console.log(postId);

  console.log(likesData.filter((like) => like.post !== postId));

  const handleLikePost = async () => {
    const res = await likePost({
      userId: JSON.parse(userId),
      postId: JSON.parse(postId),
    });
    console.log(res);
  };

  return (
    <div className="flex items-center gap-2">
      {!isLiked ? (
        <IoMdHeartEmpty
          className={`text-xl cursor-pointer`}
          onClick={handleLikePost}
        />
      ) : (
        <IoMdHeart
          className={`text-xl cursor-pointer text-blue-500`}
          onClick={handleLikePost}
        />
      )}
      <span className="text-sm">{likesCount}</span>
    </div>
  );
};

export default LikePost;
