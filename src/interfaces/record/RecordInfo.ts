import mongoose from "mongoose";

export interface RecordInfo {
  user_id: mongoose.Types.ObjectId;
  date: String;
  voice_id: mongoose.Types.ObjectId;
  title: string;
  content: string;
  emotion: number;
  dream_color: number;
  genre: number[];
  note: string;
  is_deleted: boolean;
}
