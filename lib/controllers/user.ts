"use server";

import User from "../models/user";
import { connectDB } from "../mongoose";

type updateUserParams = {
  id: string;
  name: string;
  username: string;
  image: string;
  bio: string;
};

export const updateUser = async ({
  id,
  name,
  username,
  image,
  bio,
}: updateUserParams): Promise<void> => {
  try {
    connectDB();
    const user = await User.findOne({ id });

    if (user) {
      await User.findOneAndUpdate({ id }, { name, username, image, bio });
    } else {
      await new User({ id, name, username, image, bio }).save();
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchUser = async (id: string) => {
  try {
    connectDB();
    const user = await User.findOne({ id });
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
