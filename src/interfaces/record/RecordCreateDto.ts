import mongoose from "mongoose";

export interface RecordCreateDto {
  date?: Date;
  title: string;
  content?: string;
  emotion?: number;
  dream_color?: number;
  genre?: number[];
  note?: string;
  writer?: mongoose.Types.ObjectId;
  voice?: mongoose.Types.ObjectId;
}
