import dayjs from "dayjs";
import mongoose from "mongoose";
import { NoticeInfo } from "../interfaces/notice/NoticeInfo";
import userMocking from "./UserMocking";

const NoticeSchema = new mongoose.Schema({
  time: {
    type: String,
    default: dayjs().format("A hh:mm"),
  },
  createdAt: {
    type: String,
    default: dayjs().format("YYYY-MM-DD HH:mm"),
  },
  is_changed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<NoticeInfo & mongoose.Document>("Notice", NoticeSchema);
