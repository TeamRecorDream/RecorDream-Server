import mongoose from "mongoose";
import { RecordInfo } from "../interfaces/record/RecordInfo";

const RecordSchema = new mongoose.Schema(
  {
    writer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    voice: {
      type: mongoose.Types.ObjectId,
      ref: "Voice",
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
    },
    genre: {
      type: Array,
    },
    note: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<RecordInfo & mongoose.Document>("Record", RecordSchema);
