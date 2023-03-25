import mongoose from "mongoose";

export interface AuthLogoutDto {
  userId: mongoose.Types.ObjectId;
}
