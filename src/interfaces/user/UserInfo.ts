export interface UserInfo {
  nickname: string;
  email: string;
  password: string;
  emotion_arr: number[];
  is_deleted: boolean;
  is_notified: boolean;
  time: string | null;
  fcm_token: string[];
}
