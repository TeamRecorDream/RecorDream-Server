import dayjs from "dayjs";
import mongoose from "mongoose";
import { NoticeInfo } from "../interfaces/notice/NoticeInfo";
import userMocking from "./UserMocking";
dayjs.locale("en");

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
    type: String,
    default: dayjs().format("YYYY-MM-DD HH:mm"),
  },
});

export default mongoose.model<NoticeInfo & mongoose.Document>("Notice", NoticeSchema);
