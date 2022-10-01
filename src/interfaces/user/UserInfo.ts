export interface UserInfo {
  nickname: string;
  email: string;
  gender: string;
  age_range: string;
  emotion_arr: number[];
  isAlreadyUser: boolean;

  fcmToken: string[];
  accessToken: string;
  refreshToken: string;
  is_notified: boolean;
  time: string | null;
}
