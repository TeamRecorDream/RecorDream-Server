import mongoose from "mongoose";

export interface RecordInfo {
  user: mongoose.Types.ObjectId;
  date: string;
  voice: mongoose.Types.ObjectId;
  title: string;
  content: string;
  emotion: number;
  dream_color: number;
  genre: number[];
  note: string;
  is_deleted: boolean;
}
