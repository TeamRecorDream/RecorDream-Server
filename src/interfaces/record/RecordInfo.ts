import { UserInfo } from '../user/UserInfo';
import { VoiceInfo } from '../voice/VoiceInfo';

export interface RecordInfo {
  writer: UserInfo;
  date: Date;
  voice: VoiceInfo;
  title: string;
  content: string;
  emotion: number;
  dream_color: number;
  genre: number[];
  note: string;
}

export interface RecordListInfo {
  date: string;
  title: string;
  emotion: number;
  dream_color: number;
  genre: number[];
}