"use client";

import { LikesProvider } from "@/context/LikesContext";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import CommentForm from "./CommentForm";

const PostDetails = ({
  id,
  user,
  userInfo,
  res,
}: {
  id: string;
  user: any;
  userInfo: any;
  res: any;
}) => {
  const [post, setPost] = useState(res);

  const profileImage = userInfo ? userInfo.image : user.imageUrl;

  if (!post) {
    return <div>Loading...</div>;
  }

  const initialCommentsLikesState: any = {};
  post.children.forEach((post: any) => {
    initialCommentsLikesState[post._id] = post.totalLikes;
  });

  return (
    <div className="p-16">
      <LikesProvider initialLikesState={{ [post._id]: post.totalLikes }}>
        <div>
          <PostCard
            image={post.author.image}
            username={post.author.username}
            text={post.text}
            postId={post._id}
            userId={post.author.id}
            isComment={false}
            likesCount={post.totalLikes}
            repliesCount={post.children?.length}
          />
          <CommentForm
            profileImage={profileImage}
            authorId={userInfo._id}
            parentId={post._id}
          />
        </div>
      </LikesProvider>
      <LikesProvider initialLikesState={initialCommentsLikesState}>
        <div className="flex flex-col">
          {post.children.reverse().map((comment: any) => {
            return (
              <PostCard
                key={comment._id}
                image={comment.author.image}
                username={comment.author.username}
                text={comment.text}
                postId={comment._id}
                userId={comment.author.id}
                isComment={true}
                likesCount={comment.totalLikes}
                repliesCount={comment.children?.length}
              />
            );
          })}
        </div>
      </LikesProvider>
    </div>
  );
};

export default PostDetails;
