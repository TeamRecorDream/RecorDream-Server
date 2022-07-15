import mongoose from "mongoose";

export interface NoticeResponseDto {
  noticeId: mongoose.Schema.Types.ObjectId;
  createdAt: string;
}
