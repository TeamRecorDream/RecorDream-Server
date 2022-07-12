import { VoiceInfo } from "../voice/VoiceInfo";

export interface RecordResponseDto{
    writer: string; //nickname 만
    date: string;
    voice: VoiceInfo;
    title: string;
    content: string;
    emotion: number;
    dream_color: number;
    genre: number[];
    note: string;
    is_deleted: boolean;
}

