export interface AuthResponseDto {
  userId: string;
  nickname: string;
  accessToken: string;
  refreshToken: string;
  isAlreadyUser: boolean;
}
