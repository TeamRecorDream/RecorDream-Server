import { PostBaseResponseDto } from '../interfaces/common/PostBaseResponseDto';
import { RecordCreateDto } from '../interfaces/record/RecordCreateDto';
import Record from '../models/Record';
import { VoiceResponseDto } from '../interfaces/voice/VoiceResponseDto';
import { RecordResponseDto } from '../interfaces/record/RecordResponseDto';
import { RecordUpdateDto } from '../interfaces/record/RecordUpdateDto';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { RecordInfo } from '../interfaces/record/RecordInfo';

dayjs.locale('ko');

const createRecord = async (recordCreateDto: RecordCreateDto): Promise<PostBaseResponseDto> => {
  try {
    const record = new Record(recordCreateDto);

    await record.save();

    const data = {
      _id: record._id,
    };

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getRecord = async (recordId: string): Promise<RecordResponseDto | null> => {
  try {
    const record = await Record.findById(recordId).populate('writer', 'nickname').populate('voice', 'url');
    if (!record) return null;

    let voiceResponse: VoiceResponseDto | null = null;
    if (record.voice) {
      voiceResponse = {
        _id: record.voice._id,
        url: record.voice.url,
      };
    }

    const data = {
      _id: record._id,
      writer: record.writer.nickname,
      date: dayjs(record.date).format('YYYY/MM/DD (ddd)'),
      title: record.title,
      voice: voiceResponse,
      content: record.content,
      emotion: record.emotion,
      dream_color: record.dream_color,
      genre: record.genre,
      note: record.note,
    };

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateRecord = async (recordId: string, recordUpdateDto: RecordUpdateDto): Promise<RecordInfo | null> => {
  try {
    const record = await Record.findById(recordId);
    if (!record) return null;
    const update = recordUpdateDto;

    const data = await Record.findOneAndUpdate(
      { _id: recordId }, //filter
      {
        $set: update, //수정 사항
      },
      { new: true } //업데이트 후 도큐먼트 반환
    );

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteRecord = async (recordId: string): Promise<Boolean> => {
  try {
    const record = await Record.findByIdAndDelete(recordId);

    if (!record) return false;
    return true;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord,
};
