import Record from "../models/Record";
import User from "../models/User";
import dayjs from "dayjs";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { RecordCreateDto } from "../interfaces/record/RecordCreateDto";
import { RecordUpdateDto } from "../interfaces/record/RecordUpdateDto";
import { RecordResponseDto } from "../interfaces/record/RecordResponseDto";
import { RecordHomeResponseDto } from "../interfaces/record/RecordHomeResponseDto";
import { RecordStorageResponseDto } from "../interfaces/record/RecordStorageResponseDto";
import { VoiceResponseInRecordDto } from "../interfaces/voice/VoiceResponseInRecordDto";
import { RecordInfo } from "../interfaces/record/RecordInfo";
import { RecordListInfo } from "../interfaces/record/RecordInfo";
import exceptionMessage from "../modules/exceptionMessage";
import Voice from "../models/Voice";

const createRecord = async (recordCreateDto: RecordCreateDto): Promise<PostBaseResponseDto | null> => {
  try {
    const record = new Record(recordCreateDto);

    if (record.emotion !== null && (record.emotion < 1 || record.emotion > 5)) {
      return null;
    }
    if (record.emotion === null) {
      record.emotion = 6;
    }

    let genre_error = false;
    let genre_count = 0;

    if (record.genre === null) {
      record.genre = [0];
      genre_count = 1;
    } else {
      record.genre.map((genre) => {
        genre_count++;
        if (genre < 1 || genre > 10) {
          genre_error = true;
        }
      });
    }

    if (genre_error || genre_count > 3 || genre_count === 0) {
      return null;
    }

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

const getRecord = async (userId: string, recordId: string): Promise<RecordResponseDto | null | number> => {
  try {
    const record = await Record.findOne({ _id: recordId, writer: userId }).populate("writer", "nickname").populate("voice");
    if (!record) return null;

    let voiceResponse: VoiceResponseInRecordDto | null = null;
    if (record.voice) {
      voiceResponse = {
        _id: record.voice._id,
        url: record.voice.url,
      };
    }

    const data = {
      _id: record._id,
      writer: record.writer.nickname,
      date: dayjs(record.date).format("YYYY/MM/DD (ddd)").toUpperCase(),
      title: record.title,
      voice: voiceResponse,
      content: record.content,
      emotion: record.emotion,
      genre: record.genre,
      note: record.note,
    };

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getRecordHome = async (userId: string): Promise<RecordHomeResponseDto | null> => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return null;
    }

    const recordList = await Record.aggregate([{ $match: { writer: user._id } }, { $sample: { size: 10 } }]);

    const records: RecordListInfo[] = await Promise.all(
      recordList.map((record: any) => {
        record.isExistVoice = false;
        if (record.voice !== null) {
          record.isExistVoice = true;
        }

        const result = {
          _id: record._id,
          emotion: record.emotion,
          date: dayjs(record.date).format("YYYY/MM/DD ddd").toUpperCase(),
          title: record.title,
          genre: record.genre,
          content: record.content,
          isExistVoice: record.isExistVoice,
        };
        return result;
      })
    );

    const data = {
      nickname: user.nickname,
      records: records,
    };

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateRecord = async (
  userId: string,
  recordId: string,
  recordUpdateDto: RecordUpdateDto
): Promise<RecordInfo | null | number> => {
  try {
    const record = await Record.findOne({ _id: recordId, writer: userId });
    if (!record) {
      return null;
    }

    const update = recordUpdateDto;

    if (update.emotion !== undefined) {
      if (update.emotion !== null && (update.emotion < 1 || update.emotion > 5)) {
        return exceptionMessage.RECORD_UPDATE_NUMBER_FAIL;
      }
      if (update.emotion === null) {
        update.emotion = 6;
      }
    }

    let genre_error = false;
    let genre_count = 0;

    if (update.genre !== undefined) {
      if (update.genre === null) {
        update.genre = [0];
        genre_count = 1;
      } else {
        update.genre.map((genre) => {
          genre_count++;
          if (genre < 1 || genre > 10) {
            genre_error = true;
          }
        });
      }

      if (genre_error || genre_count > 3 || genre_count === 0) {
        return exceptionMessage.RECORD_UPDATE_NUMBER_FAIL;
      }
    }

    const data = await Record.findOneAndUpdate(
      { _id: recordId, writer: userId }, //filter
      {
        $set: update, //수정 사항
      },
      { new: true } //업데이트 후 도큐먼트 반환
    );

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteRecord = async (userId: string, recordId: string): Promise<boolean> => {
  try {
    const record = await Record.findOneAndDelete({ _id: recordId, writer: userId });

    if (!record) {
      return false;
    }
    if (record.voice != null) {
      const voice = await Voice.deleteOne({ _id: record.voice });
      if (!voice) {
        return false;
      }
    }
    return true;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getRecordStorage = async (userId: string, filter: string): Promise<RecordStorageResponseDto | null> => {
  try {
    let recordList;

    switch (filter) {
      case "0": // 전체
        recordList = await Record.find({ writer: userId }).sort({ date: -1, _id: -1 });
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6": // 미설정
        recordList = await Record.find({ $and: [{ writer: userId }, { emotion: parseInt(filter) }] }).sort({
          date: -1,
          _id: -1,
        });
        break;
      default:
        return null;
    }

    let count = 0;
    const records: RecordListInfo[] = await Promise.all(
      recordList.map((record) => {
        record.isExistVoice = false;
        if (record.voice !== null) {
          record.isExistVoice = true;
        }

        const result = {
          _id: record._id,
          emotion: record.emotion,
          date: dayjs(record.date).format("YYYY/MM/DD ddd").toUpperCase(),
          title: record.title,
          genre: record.genre,
          isExistVoice: record.isExistVoice,
        };
        count++;
        return result;
      })
    );

    const data: RecordStorageResponseDto = {
      recordsCount: count,
      records: records,
    };

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getRecordsBySearch = async (userId: string, keyword: string): Promise<RecordStorageResponseDto | null> => {
  const regex = (pattern: string) => new RegExp(`.*${pattern}.*`);

  try {
    const Regex: RegExp = regex(keyword);
    const recordList = await Record.find({
      $or: [
        { title: { $regex: Regex }, writer: userId },
        { content: { $regex: Regex }, writer: userId },
        { note: { $regex: Regex }, writer: userId },
      ],
    }).sort({
      date: -1,
      _id: -1,
    });
    let count = 0;
    const records: RecordListInfo[] = await Promise.all(
      recordList.map((record: any) => {
        const result = {
          _id: record._id,
          title: record.title,
          date: dayjs(record.date).format("YYYY/MM/DD (ddd)").toUpperCase(),
          emotion: record.emotion,
          genre: record.genre,
        };
        count++;
        return result;
      })
    );
    const data = {
      recordsCount: count,
      records: records,
    };
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  createRecord,
  getRecord,
  getRecordHome,
  updateRecord,
  deleteRecord,
  getRecordStorage,
  getRecordsBySearch,
};
