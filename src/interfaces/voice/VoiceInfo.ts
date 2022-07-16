import mongoose from "mongoose";

export interface VoiceInfo {
  _id: mongoose.Schema.Types.ObjectId;
  url: string;
  fileName: string;
}
