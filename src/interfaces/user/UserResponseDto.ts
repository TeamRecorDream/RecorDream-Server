export interface UserResponseDto {
  nickname: string;
  email: string;
  isActive: boolean;
  time: string | null; // is_notified가 false일 경우, time은 null로 설정하기 위해
}
