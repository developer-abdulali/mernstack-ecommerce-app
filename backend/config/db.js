import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("successfully connected to Mongodb database");
  } catch (error) {
    console.log(`ERROR: ${error.messsage}`);
    process.exit(1);
  }
};
