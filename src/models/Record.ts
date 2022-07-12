import mongoose from "mongoose";
import { RecordInfo } from "../interfaces/record/RecordInfo";
import dayjs from "dayjs";
import userMocking from "../models/UserMocking";
import User from "./User";

const RecordSchema = new mongoose.Schema({
  writer: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: userMocking
  },
  date: {
    type: String,
    default: dayjs().format("YYYY-MM-DD"),
  },
  voice: {
    type: mongoose.Types.ObjectId,
    ref: "Voice"
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  emotion: {
    type: Number,
    default: 0,
  },
  dream_color: {
    type: Number,
    default: 0,
  },
  genre: {
    type: Array,
  },
  note: {
    type: String,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<RecordInfo & mongoose.Document>("Record", RecordSchema);
