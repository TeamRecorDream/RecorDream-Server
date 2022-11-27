import { RecordListInfo } from "./RecordInfo";

export interface RecordStorageResponseDto {
  recordsCount: number;
  records: RecordListInfo[];
}
