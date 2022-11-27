export interface RecordUpdateDto {
  title: string;
  date: Date;
  content: string | null;
  emotion: number | null;
  genre: number[] | null;
  note: string | null;
}
