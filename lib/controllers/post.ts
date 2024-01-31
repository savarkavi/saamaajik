"use server";

import Post from "../models/post";
import User from "../models/user";
import { connectDB } from "../mongoose";

type createPostParams = {
  text: string;
  authorId: string;
};

type addCommentParams = {
  text: string;
  authorId: string;
  parentId: string;
};

type likePostParams = {
  userId: string;
  postId: string;
};

export const createPost = async ({ text, authorId }: createPostParams) => {
  try {
    connectDB();
    const post = await new Post({
      text,
      author: authorId,
    }).save();

    await User.findByIdAndUpdate(authorId, { $push: { posts: post._id } });

    return post;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchPosts = async ({ page = 1, pageSize = 20 }) => {
  try {
    connectDB();

    const skipAmount = (page - 1) * pageSize;

    const posts = await Post.find({ parent: { $exists: false } })
      .sort({ createdAt: -1 })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author" })
      .populate({ path: "children", populate: { path: "author" } });

    return posts;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchPostsByUser = async ({ userId }: { userId: string }) => {
  try {
    connectDB();

    const user = await User.findOne({ id: userId }).populate({
      path: "posts",
      populate: { path: "author" },
    });

    return user.posts;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchPost = async (id: string) => {
  try {
    connectDB();

    const post = await Post.findById(id)
      .populate({ path: "author" })
      .populate({ path: "children", populate: { path: "author" } });

    return post;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const addComment = async ({
  text,
  authorId,
  parentId,
}: addCommentParams) => {
  try {
    connectDB();

    const parentPost = await Post.findById(parentId);

    if (!parentId) {
      throw new Error("Post not found");
    }

    const comment = await new Post({
      text,
      author: authorId,
      parent: parentId,
    }).save();

    parentPost.children.push(comment._id);
    await parentPost.save();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// export const likePost = async ({ postId, userId }: likePostParams) => {
//   try {
//     connectDB();

//     const post = await Post.findById(postId);

//     if (
//       post.likesData.map(
//         (likeData: { user: string; postId: string }) => likeData.user === userId
//       )
//     ) {
//       const updatedPost = await Post.findByIdAndUpdate(
//         postId,
//         { $pull: { likesData: { user: userId, post: postId } } },
//         { new: true }
//       );
//       return updatedPost;
//     } else {
//       const updatedPost = await Post.findByIdAndUpdate(
//         postId,
//         { $push: { likesData: { user: userId, post: postId } } },
//         { new: true }
//       );
//       return updatedPost;
//     }
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

export const fetchActivity = async (id: string) => {
  try {
    connectDB();
    const userPosts = await Post.find({ author: id })
      .populate({
        path: "children",
        populate: { path: "author" },
      })
      .populate({ path: "likesData" });

    const commentsData = userPosts.flatMap((post) => post.children);
    const likesData = userPosts.flatMap((post) => post.likes);

    return { commentsData, likesData };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchLikesACtivity = async (id: string) => {
  try {
    connectDB();
  } catch (error: any) {
    throw new Error(error.message);
  }
};
