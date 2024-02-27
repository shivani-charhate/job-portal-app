import mongoose from "mongoose";
// import mongoose from mongoose;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL_Local);
    console.log(`Connected to mongodb ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Mongo Error ${error}`);
  }
};

export default connectDB;
