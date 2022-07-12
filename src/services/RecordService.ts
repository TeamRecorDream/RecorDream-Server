import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { RecordCreateDto } from "../interfaces/record/RecordCreateDto";
import Record from "../models/Record";
import Voice from "../models/Voice";
import { RecordResponseDto } from "../interfaces/record/RecordResponseDto";
import dayjs from "dayjs";
import 'dayjs/locale/ko'
dayjs.locale('ko')


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

const getRecord = async(recordId:string): Promise<RecordResponseDto | null> => {
  try{
      const record = await Record.findById(recordId).populate('writer','nickname').populate('voice', 'url'); 
      if (!record) return null;
      
      const data = {
        _id: record._id,
        writer: record.writer.nickname,
        date: dayjs(record.date).format("YYYY/MM/DD (ddd)"),
        title: record.title,
        voice: {
          "_id":record.voice._id, 
          "url":record.voice.url
        },
        content: record.content,
        emotion: record.emotion,
        dream_color: record.dream_color,
        genre: record.genre,
        note: record.note,
        is_deleted: record.is_deleted,
      }

      return data;
  }catch(error){
      console.log(error);
      throw error;
  }
}

export default {
  createRecord,
  getRecord
};
