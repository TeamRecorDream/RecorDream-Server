import { RecordListInfo } from "./RecordInfo";

export interface RecordStorageResponseDto {
  records_count: number;
  records: RecordListInfo[];
}
