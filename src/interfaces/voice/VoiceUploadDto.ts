import mongoose from "mongoose";

export interface VoiceUploadDto {
  url: string;
  fileName: string;
  recorder: mongoose.Types.ObjectId | string;
}
