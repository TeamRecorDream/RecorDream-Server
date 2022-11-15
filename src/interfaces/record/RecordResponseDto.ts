import { VoiceResponseInRecordDto } from "../voice/VoiceResponseInRecordDto";

export interface RecordResponseDto {
  writer: string; // nickname
  date: string; // 2022/06/26 (SUN)
  title: string;
  voice: VoiceResponseInRecordDto | null;
  content: string;
  emotion: number;
  genre: number[];
  note: string;
}
