import mongoose from "mongoose";

export interface RecordCreateDto {
  date?: Date; //required
  title: string; //required
  content?: string;
  emotion?: number; //default
  dream_color?: number; //default
  genre?: number[]; //default
  note?: string;
  writer?: mongoose.Types.ObjectId; //required
  voice?: mongoose.Types.ObjectId;
}
