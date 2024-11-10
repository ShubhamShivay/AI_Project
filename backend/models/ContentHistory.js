import { request } from "express";
import mongoose from "mongoose";


const contentHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
});


const ContentHistory = mongoose.model("ContentHistory", contentHistorySchema);
export default ContentHistory;
