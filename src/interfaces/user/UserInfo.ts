export interface UserInfo {
  nickname: string;
  email: string;
  password: string;
  emotion_arr: number[];
  is_deleted: boolean;
  is_notified: boolean;
  time: Date | null;
  fcm_token: string[];
}
