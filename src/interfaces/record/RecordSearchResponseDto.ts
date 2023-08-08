import { RecordListInfo } from "./RecordInfo";

export interface RecordSearchResponseDto {
  keyword: string;
  recordsCount: number;
  records: RecordListInfo[];
}
