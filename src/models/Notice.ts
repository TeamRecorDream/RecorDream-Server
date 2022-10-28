import dayjs from "dayjs";
import mongoose from "mongoose";
import { NoticeInfo } from "../interfaces/notice/NoticeInfo";

const NoticeSchema = new mongoose.Schema({
  time: {
    type: String,
    default: dayjs().format("A hh:mm"),
  },
  createdAt: {
    type: String,
    default: dayjs().format("YYYY-MM-DD HH:mm"),
  },
  fcmToken: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
});

export default mongoose.model<NoticeInfo & mongoose.Document>("Notice", NoticeSchema);
