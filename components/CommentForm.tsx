"use client";

import { postValidation } from "@/lib/zodSchemas/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { addComment } from "@/lib/controllers/post";
import toast from "react-hot-toast";
import { Input } from "./ui/input";
import Image from "next/image";
import PostCard from "./PostCard";

const CommentForm = ({
  profileImage,
  authorId,
  parentId,
}: {
  profileImage: string;
  authorId: string;
  parentId: string;
}) => {
  const form = useForm<z.infer<typeof postValidation>>({
    resolver: zodResolver(postValidation),
    defaultValues: {
      post: "",
    },
  });

  async function onSubmit(values: z.infer<typeof postValidation>) {
    await addComment({
      text: values.post,
      authorId: JSON.parse(authorId),
      parentId: JSON.parse(parentId),
    });

    values.post = "";
    toast.success("Comment posted!");
  }

  return (
    <div className="w-full max-w-[800px] my-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-8 h-full"
        >
          <FormField
            control={form.control}
            name="post"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 border-y border-gray-600">
                <FormLabel>
                  <Image
                    src={profileImage}
                    alt="profile image"
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Comment..."
                    className="w-full bg-transparent py-12 border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-none text-white"
                    {...field}
                  />
                </FormControl>
                <button
                  type="submit"
                  className="text-white bg-blue-700 py-3 px-6 rounded-xl"
                >
                  Reply
                </button>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default CommentForm;
