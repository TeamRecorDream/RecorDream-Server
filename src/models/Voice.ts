import mongoose from "mongoose";
import { VoiceInfo } from "../interfaces/voice/VoiceInfo";

const VoiceSchema = new mongoose.Schema(
  {
    recorder: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
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
    versionKey: false,
  }
);

export default mongoose.model<VoiceInfo & mongoose.Document>("Voice", VoiceSchema);
