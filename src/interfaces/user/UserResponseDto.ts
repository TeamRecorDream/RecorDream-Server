export interface UserResponseDto {
  nickname: string;
  email: string;
  isActive: boolean;
  time: string | null; // isActive가 false인 경우, time은 항상 null
}
