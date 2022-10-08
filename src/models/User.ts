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
    unique: true,
  },
  refreshToken: {
    type: String,
    required: true,
    unique: true,
  },
  fcmToken: {
    type: [String],
    unique: true,
  },
});

export default mongoose.model<UserInfo & mongoose.Document>("User", UserSchema);
