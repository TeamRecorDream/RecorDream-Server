export interface RecordCreateDto {
  date?: string;
  title: string;
  content?: string;
  emotion?: number;
  dream_color?: number;
  genre?: number[];
  note?: string;
}