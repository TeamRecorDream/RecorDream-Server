import mongoose from "mongoose";

export interface RecordCreateDto {
  writer: mongoose.Types.ObjectId; //required
  title: string; //required
  date: Date; //required
  content?: string | null;
  emotion?: number | null; //default
  genre?: number[] | null; //default
  note?: string | null;
  voice?: mongoose.Types.ObjectId | null;
}
