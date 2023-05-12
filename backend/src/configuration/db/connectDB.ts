import mongoose from "mongoose";
import dotenv from "dotenv";
import { MONGODB_URI } from "@/utils/variables";
dotenv.config();

const URI: string = MONGODB_URI as string;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Db is Connected Successfully");
  } catch (error) {
    console.log(`Error ${error}`);
  }
};

export default connectDB;
