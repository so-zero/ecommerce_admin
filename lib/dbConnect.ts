import mongoose from "mongoose";

const DB_URI = process.env.MONGODB_URI || "";

let isConnected: boolean = false;

export const dbConnect = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(`${DB_URI}`);
    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};
