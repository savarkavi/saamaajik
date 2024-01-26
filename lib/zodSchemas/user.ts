import * as z from "zod";

export const userValidation = z.object({
  profile_photo: z.string().url().min(1),
  name: z.string().min(2).max(20),
  username: z.string().min(2).max(20),
  bio: z.string().min(1).max(200),
});
