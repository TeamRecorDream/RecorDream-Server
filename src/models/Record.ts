import mongoose from "mongoose";
import { RecordInfo } from "../interfaces/record/RecordInfo";
import dayjs from "dayjs";

const RecordSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
  },
  date: {
    type: String,
    default: dayjs().format("YYYY-MM-DD"),
  },
  voice_id: {
    type: mongoose.Types.ObjectId,
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
