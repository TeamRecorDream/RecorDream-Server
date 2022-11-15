import mongoose from "mongoose";

export interface VoiceResponseInRecordDto {
  _id: mongoose.Schema.Types.ObjectId;
  url: string;
}
