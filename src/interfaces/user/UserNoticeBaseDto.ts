import mongoose from "mongoose";

export interface UserNoticeBaseDto {
  userId: mongoose.Types.ObjectId;
  time: string;
}
