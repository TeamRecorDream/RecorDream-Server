import mongoose from "mongoose";
import { VoiceInfo } from "../interfaces/voice/VoiceInfo";

const VoiceSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<VoiceInfo & mongoose.Document>("Voice", VoiceSchema);
