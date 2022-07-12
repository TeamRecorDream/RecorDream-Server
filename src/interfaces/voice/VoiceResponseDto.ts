import mongoose from 'mongoose';

export interface VoiceResponseDto {
  _id: mongoose.Schema.Types.ObjectId;
  link: string;
}
