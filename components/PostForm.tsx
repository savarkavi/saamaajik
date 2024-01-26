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

import { Textarea } from "./ui/textarea";
import { createPost } from "@/lib/controllers/post";
import toast from "react-hot-toast";

const PostForm = ({ authorId }: { authorId: string }) => {
  const form = useForm<z.infer<typeof postValidation>>({
    resolver: zodResolver(postValidation),
    defaultValues: {
      post: "",
    },
  });

  async function onSubmit(values: z.infer<typeof postValidation>) {
    const post = await createPost({
      text: values.post,
      authorId,
    });

    values.post = "";
    toast.success("Posted!");
    console.log(post);
  }

  return (
    <div className="w-full max-w-[600px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-8 h-full"
        >
          <FormField
            control={form.control}
            name="post"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>content</FormLabel>
                <FormControl>
                  <Textarea
                    className="w-full bg-stone-800 text-white"
                    rows={15}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="text-white bg-blue-700 p-4 rounded-xl"
          >
            Submit
          </button>
        </form>
      </Form>
    </div>
  );
};

export default PostForm;
