export interface UserResponseDto {
  nickname: string;
  email: string;
  is_notified: boolean;
  time: string | null; // is_notified가 false일 경우, time은 null로 설정하기 위해
  is_deleted: boolean;
  fcm_token: string;
}
