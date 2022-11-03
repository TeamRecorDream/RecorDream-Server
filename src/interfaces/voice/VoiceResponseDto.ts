import mongoose from "mongoose";

export interface VoiceResponseDto {
  _id: mongoose.Schema.Types.ObjectId;
  recorder: mongoose.Schema.Types.ObjectId | string;
  url: string;
}
