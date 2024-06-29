import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// db connect using uri 
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log(`MONGODB Connection successful! Host`);
  } catch (error) {
    console.error("MONGODB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;