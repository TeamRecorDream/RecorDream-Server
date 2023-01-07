import dayjs from "dayjs";
import mongoose from "mongoose";
import { UserInfo } from "../interfaces/user/UserInfo";

const UserSchema = new mongoose.Schema(
  {
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
    ageRange: {
      type: String,
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
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<UserInfo & mongoose.Document>("User", UserSchema);
