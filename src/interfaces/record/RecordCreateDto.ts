import mongoose from "mongoose";

export interface RecordCreateDto {
  date?: Date; //default
  title: string; //required
  content?: string;
  emotion?: number; //default
  dream_color?: number; //default
  genre?: number[]; //default
  note?: string;
  writer?: mongoose.Types.ObjectId; //default
  voice?: mongoose.Types.ObjectId;
}
