import { RecordListInfo } from "./RecordInfo";

export interface RecordHomeResponseDto {
  nickname: string;
  records: RecordListInfo[];
}
