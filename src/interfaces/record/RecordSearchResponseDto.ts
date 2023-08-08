import { RecordListInfo } from "./RecordInfo";

export interface RecordSearchResponseDto {
  keyword: any;
  recordsCount: number;
  records: RecordListInfo[];
}
