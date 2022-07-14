import dayjs from "dayjs";
import mongoose from "mongoose";
import { NoticeInfo } from "../interfaces/notice/NoticeInfo";
import userMocking from "./UserMocking";

const NoticeSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: userMocking,
  },
  time: {
    type: String,
    default: dayjs().format("A hh:mm"),
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

export default mongoose.model<NoticeInfo & mongoose.Document>("Notice", NoticeSchema);
