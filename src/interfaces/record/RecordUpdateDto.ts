export interface RecordUpdateDto {
  //writer, voice는 수정 불가
  date: string;
  title: string;
  content: string;
  emotion: number;
  dream_color: number;
  genre: number[];
  note: string;
}
