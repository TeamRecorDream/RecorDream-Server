export interface AuthResponseDto {
  nickname: string;
  //email: string;
  //gender: string | null;
  //age_range: string | null;
  //fcmToken: string;
  accessToken: string;
  refreshToken: string;
  isAlreadyUser: boolean;
}
