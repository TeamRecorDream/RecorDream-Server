export interface AuthResponseDto {
  nickname: string;
  accessToken: string;
  refreshToken: string;
  //fcmToken: string;
  isAlreadyUser: boolean;
}
