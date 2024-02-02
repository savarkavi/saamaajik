"use client";

import { LikesContext } from "@/context/LikesContext";
import { getLikesData, likePost } from "@/lib/controllers/like";
import { fetchPosts } from "@/lib/controllers/post";
import React, { useContext, useEffect, useState } from "react";
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

  const { likesState, setLikesState } = useContext(LikesContext);

  useEffect(() => {
    const fetchLikesData = async () => {
      const res = await getLikesData();

      if (res && res?.length > 0) {
        const isLiked = res.some((like) => {
          return like.user === userId && like.post === postId;
        });
        console.log(res);
        console.log(typeof userId, typeof postId);

        setLikesData(res);
        setIsLiked(isLiked);
      }
    };

    fetchLikesData();
  }, [postId, userId]);

  const handleLikePost = async () => {
    const res = await likePost({
      userId: JSON.parse(userId),
      postId: JSON.parse(postId),
    });

    setIsLiked((prev) => !prev);

    if (isLiked) {
      setLikesState((prevLikesState) => ({
        ...prevLikesState,
        [postId]: prevLikesState[postId] - 1,
      }));
    } else {
      setLikesState((prevLikesState) => ({
        ...prevLikesState,
        [postId]: prevLikesState[postId] + 1,
      }));
    }
  };
  console.log(likesState);
  // console.log(isLiked);

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
      <span className="text-sm">{likesState[postId]}</span>
    </div>
  );
};

export default LikePost;
