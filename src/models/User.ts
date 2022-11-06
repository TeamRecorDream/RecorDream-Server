import dayjs from "dayjs";
import mongoose from "mongoose";
import { UserInfo } from "../interfaces/user/UserInfo";

const UserSchema = new mongoose.Schema({
  appleId: {
    type: String,
  },
  nickname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
  },
  age_range: {
    type: String,
  },
  emotion_arr: {
    type: Array,
  },
  isAlreadyUser: {
    type: Boolean,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  fcmTokens: {
    type: [String],
  },
  time: {
    type: String,
    default: dayjs().format("A hh:mm"),
  },
  isActive: {
    type: Boolean,
  },
});

export default mongoose.model<UserInfo & mongoose.Document>("User", UserSchema);
