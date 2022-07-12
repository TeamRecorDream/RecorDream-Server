import { VoiceInfo } from "../voice/VoiceInfo";
import { VoiceResponseDto } from "../voice/VoiceResponseDto";

export interface RecordResponseDto{
    writer: string;
    date: string;
    voice: VoiceResponseDto;
    title: string;
    content: string;
    emotion: number;
    dream_color: number;
    genre: number[];
    note: string;
    is_deleted: boolean;
}