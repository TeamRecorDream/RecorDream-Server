import { VoiceResponseDto } from "../voice/VoiceResponseDto";
import mongoose from "mongoose";

export interface RecordResponseDto {
  _id: mongoose.Types.ObjectId;
  writer: string; // nickname
  date: string; // 2022/06/26 (일)
  voice: VoiceResponseDto | null;
  title: string;
  content: string | null;
  emotion: number;
  dream_color: number;
  genre: number[];
  note: string | null;
}
