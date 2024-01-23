import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (!process.env.MONGO_URL) return console.log("Mongo URL not found");
  if (isConnected) {
    console.log("Already connected to Mongo DB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;

    console.log("Mongo DB connected.");
  } catch (error) {
    console.log(error);
  }
};
