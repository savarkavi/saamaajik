"use server";

import Like from "../models/like";
import Post from "../models/post";
import { connectDB } from "../mongoose";

type likePostParams = {
  userId: string;
  postId: string;
};

export const likePost = async ({ userId, postId }: likePostParams) => {
  try {
    connectDB();

    const existingLikedPost = await Like.findOne({
      user: userId,
      post: postId,
    });

    if (existingLikedPost) {
      const dislikedPost = await Like.deleteOne({ user: userId, post: postId });

      await Post.findByIdAndUpdate(postId, { $inc: { totalLikes: -1 } });

      return dislikedPost;
    } else {
      const likedPost = await new Like({
        user: userId,
        post: postId,
      }).save();

      await Post.findByIdAndUpdate(postId, { $inc: { totalLikes: 1 } });

      return likedPost;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getLikesData = async () => {
  try {
    connectDB();

    const likesData = await Like.find();

    if (likesData) {
      return likesData;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
