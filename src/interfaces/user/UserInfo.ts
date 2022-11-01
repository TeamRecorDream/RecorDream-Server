import mongoose from "mongoose";

export interface UserInfo {
  appleId: string;
  nickname: string;
  email: string;
  gender: string;
  age_range: string;
  emotion_arr: number[];
  isAlreadyUser: boolean;
  fcmTokens: [mongoose.Types.ObjectId];
  accessToken: string;
  refreshToken: string;
  time: string | null;
}
