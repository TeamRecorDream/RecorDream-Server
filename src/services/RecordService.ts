import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { RecordCreateDto } from "../interfaces/record/RecordCreateDto";
import Record from "../models/Record";
import { RecordResponseDto } from "../interfaces/record/RecordResponseDto";
import { RecordUpdateDto } from "../interfaces/record/RecordUpdateDto";
import { RecordInfo } from "../interfaces/record/RecordInfo";

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

const getRecord = async(recordId:string): Promise<RecordCreateDto | null> => {
  try{
      const record = await Record.findById(recordId).populate('writer', 'nickname').populate('voice'); 
      if (!record) return null;

      return record;
  }catch(error){
      console.log(error);
      throw error;
  }
}

const updateRecord = async(recordId: string, recordUpdateDto:RecordUpdateDto): Promise<RecordInfo | null> => {
  try{
      const record = await Record.findById(recordId);
      if (!record) return null;
      const update = recordUpdateDto;

      const data = await Record.findOneAndUpdate(
          {_id: recordId}, //filter
          {
              $set: update //수정 사항
          }, 
          {new:true} //업데이트 후 도큐먼트 반환
      );

      return data;
  }catch(error){
      console.log(error);
      throw error;
  }
}

const deleteRecord = async(recordId:string):Promise<void> => {
  try{
      await Record.findByIdAndDelete(recordId);
  }catch(err){
      console.log(err);
      throw err;
  }
}

export default {
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord
};
