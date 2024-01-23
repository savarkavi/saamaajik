"use client";

import { postValidation } from "@/lib/zodSchemas/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { dark } from "@clerk/themes";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Textarea } from "./ui/textarea";
import { OrganizationSwitcher } from "@clerk/nextjs";

const PostForm = () => {
  const form = useForm<z.infer<typeof postValidation>>({
    resolver: zodResolver(postValidation),
    defaultValues: {
      post: "",
    },
  });

  async function onSubmit(values: z.infer<typeof postValidation>) {}

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
