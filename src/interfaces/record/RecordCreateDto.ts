import mongoose from "mongoose";

export interface RecordCreateDto {
  date?: Date; //required
  title: string; //required
  content?: string | null;
  emotion?: number | null; //default
  dream_color?: number | null; //default
  genre?: number[] | null; //default
  note?: string | null;
  writer?: mongoose.Types.ObjectId; //required
  voice?: mongoose.Types.ObjectId | null;
}
