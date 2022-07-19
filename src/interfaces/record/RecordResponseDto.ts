import { VoiceResponseDto } from "../voice/VoiceResponseDto";

export interface RecordResponseDto {
  writer: string | null; // nickname
  date: string | null; // 2022/06/26 (일)
  voice: VoiceResponseDto | null;
  title: string;
  content: string | null;
  emotion: number | null;
  dream_color: number | null;
  genre: number[] | null;
  note: string | null;
}
