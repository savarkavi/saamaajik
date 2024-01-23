import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
