import { UserInfo } from "../user/UserInfo";
import { VoiceInfo } from "../voice/VoiceInfo";

export interface RecordInfo {
  writer: UserInfo;
  date: Date;
  voice: VoiceInfo;
  title: string;
  content: string;
  emotion: number;
  genre: number[];
  note: string;
  isExistVoice: boolean;
}

export interface RecordListInfo {
  date: string;
  title: string;
  emotion: number;
  genre: number[];
}
