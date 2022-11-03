import mongoose from "mongoose";

export interface UserNoticePostDto {
  userId: mongoose.Types.ObjectId;
  time: string;
}
