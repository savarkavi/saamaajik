"use client";

import { userValidation } from "@/lib/zodSchemas/user";
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
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "./ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/controllers/user";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type userProps = {
  user: {
    id: string;
    name: string | undefined;
    username: string | undefined;
    image: string;
    bio: string;
  };
};

const OnboardingForm = ({ user }: userProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("imageUploader");
  const router = useRouter();

  const form = useForm<z.infer<typeof userValidation>>({
    resolver: zodResolver(userValidation),
    defaultValues: {
      profile_photo: user.image,
      name: user.name,
      username: user.username,
      bio: user.bio,
    },
  });

  async function onSubmit(values: z.infer<typeof userValidation>) {
    const blob = values.profile_photo;

    const isImageChanged = isBase64Image(blob);

    if (isImageChanged) {
      const imageUrl = await startUpload(files);

      if (imageUrl) {
        values.profile_photo = imageUrl[0].url;
      }
    }

    await updateUser({
      id: user.id,
      name: values.name,
      username: values.username,
      image: values.profile_photo,
      bio: values.bio,
    });

    toast.success("Your profile has been created!");
    router.push("/");
  }

  const handleImageChange = async (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files?.[0];
      setFiles(Array.from(e.target.files));
      const dataURL = await readFileAsDataURL(file);
      fieldChange(dataURL);
    }
  };

  const readFileAsDataURL = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        if (typeof fileReader.result === "string") {
          resolve(fileReader.result);
        } else {
          reject(new Error("Failed to upload the image"));
        }
      };
    });
  };

  return (
    <div className="bg-stone-900 w-full h-[650px] rounded-xl p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between h-full"
        >
          <FormField
            control={form.control}
            name="profile_photo"
            render={({ field }) => (
              <FormItem className="flex gap-2 items-center">
                <FormLabel className="text-white rounded-full">
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt="profile photo"
                      width={80}
                      height={80}
                      className="rounded-full object-cover w-[80px] h-[80px] max-w-none"
                    />
                  ) : (
                    <Image
                      src="/assets/pp.png"
                      width={80}
                      height={80}
                      alt="profile-photo"
                      className="rounded-full object-cover"
                    />
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, field.onChange)}
                    className="bg-transparent file:text-blue-700 outline-none border-none text-white cursor-pointer w-full"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="text-white">Name</FormLabel>
                <FormControl>
                  <Input type="text" className="" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="text-white">Username</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="text-white">Bio</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={10} />
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

export default OnboardingForm;
