import { VoiceResponseDto } from '../voice/VoiceResponseDto';

export interface RecordResponseDto {
  writer: string; // nickname
  date: string; // 2022/06/26 (일)
  voice: VoiceResponseDto | null;
  title: string;
  content: string;
  emotion: number;
  dream_color: number;
  genre: number[];
  note: string;
}
