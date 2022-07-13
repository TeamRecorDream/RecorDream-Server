import mongoose from "mongoose";
import { RecordInfo } from "../interfaces/record/RecordInfo";
import dayjs from "dayjs";
import User from "./User";
import Voice from "./Voice";
import userMocking from "./UserMocking";

const RecordSchema = new mongoose.Schema({
  writer: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: userMocking
  },
  date: {
    type: Date,
    default: Date.now,
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
  },
});

export default mongoose.model<RecordInfo & mongoose.Document>("Record", RecordSchema);
