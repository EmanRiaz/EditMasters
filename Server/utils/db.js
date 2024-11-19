const mongoose=require("mongoose");
// MongoDB Connection
const connectDb = async () => {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/authentication", {
       
      });
      console.log("MongoDB connected");
    } catch (err) {
      console.error("MongoDB connection error:", err);
    }
  };
  module.exports=connectDb;