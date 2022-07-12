import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { RecordCreateDto } from "../interfaces/record/RecordCreateDto";
import Record from "../models/Record";

const createRecord = async (
  recordCreateDto: RecordCreateDto
): Promise<PostBaseResponseDto> => {
  try {
    const record = new Record(recordCreateDto);

    await record.save();

    const data = {
      _id: record._id,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createRecord,
};
