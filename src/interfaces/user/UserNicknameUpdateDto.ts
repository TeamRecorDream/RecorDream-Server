import mongoose from "mongoose";

export interface UserNicknameUpdateDto {
  userId: mongoose.Types.ObjectId;
  nickname: string;
}
