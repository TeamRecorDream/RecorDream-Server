import mongoose from "mongoose";
import { UserInfo } from "../interfaces/user/UserInfo";

const UserSchema = new mongoose.Schema({
  nickname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  emotion_arr: {
    type: Array,
  },
  is_deleted: {
    type: Boolean,
  },
  is_notified: {
    type: Boolean,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  fcm_token: {
    type: Array,
  },
});

export default mongoose.model<UserInfo & mongoose.Document>("User", UserSchema);
