import mongoose from 'mongoose';
import { VoiceInfo } from '../interfaces/voice/VoiceInfo';
import userMocking from './UserMocking';

const VoiceSchema = new mongoose.Schema(
  {
    recorder: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      default: userMocking,
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
  }
);

export default mongoose.model<VoiceInfo & mongoose.Document>('Voice', VoiceSchema);
