export interface UserInfo {
  nickname: string;
  email: string;
  password: string;
  emotion_arr: [];
  is_deleted: boolean;
  is_notified: boolean;
  time: Date;
  fcm_token: [];
}
