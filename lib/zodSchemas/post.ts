"use client";

import * as z from "zod";

export const postValidation = z.object({
  post: z.string().min(3),
});
