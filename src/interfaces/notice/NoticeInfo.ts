import { UserInfo } from "../user/UserInfo";

export interface NoticeInfo {
  user_id: UserInfo;
  time: string;
  createdAt: Date;
  updatedAt: Date;
}
