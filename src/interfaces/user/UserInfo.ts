export interface UserInfo {
  appleId: string;
  nickname: string;
  email: string;
  gender: string;
  ageRange: string;
  isAlreadyUser: boolean;
  fcmTokens: string[];
  accessToken: string;
  refreshToken: string;
  time: string | null;
  isActive: boolean;
}
