"use client";

import React from "react";
import { CiHeart } from "react-icons/ci";

const LikePost = ({
  likes,
  onClick,
}: {
  likes: string[];
  onClick: () => Promise<void>;
}) => {
  return (
    <div className="flex items-center gap-2">
      <CiHeart className="text-xl cursor-pointer" onClick={onClick} />
      <span className="text-sm">{likes.length}</span>
    </div>
  );
};

export default LikePost;
