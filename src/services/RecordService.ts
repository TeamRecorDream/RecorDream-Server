import Record from "../models/Record";
import User from "../models/User";
import dayjs from "dayjs";
import mongoose from "mongoose";
import userMocking from "../models/UserMocking";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { RecordCreateDto } from "../interfaces/record/RecordCreateDto";
import { RecordUpdateDto } from "../interfaces/record/RecordUpdateDto";
import { RecordResponseDto } from "../interfaces/record/RecordResponseDto";
import { RecordListResponseDto } from "../interfaces/record/RecordListResponseDto";
import { RecordStorageResponseDto } from "../interfaces/record/RecordStorageResponseDto";
import { VoiceResponseInRecordDto } from "../interfaces/voice/VoiceResponseInRecordDto";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import { RecordInfo } from "../interfaces/record/RecordInfo";
import { RecordListInfo } from "../interfaces/record/RecordInfo";

const createRecord = async (recordCreateDto: RecordCreateDto): Promise<PostBaseResponseDto | null> => {
  try {
    const record = new Record(recordCreateDto);

    if (record.emotion !== null && (record.emotion < 1 || record.emotion > 5)) {
      return null;
    }
    if (record.emotion === null) {
      record.emotion = 0;
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
      date: dayjs(record.date).format("YYYY/MM/DD (ddd)"),
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

const getRecordList = async (userId: string): Promise<RecordListResponseDto | null> => {
  try {
    const userObjectId: mongoose.Types.ObjectId = userMocking[parseInt(userId) - 1];
    const user: UserResponseDto | null = await User.findById(userObjectId);

    if (!user) {
      return null;
    }

    const recordList = await Record.find({ writer: userObjectId }).sort({ date: -1, _id: -1 }).limit(10);

    const records: RecordListInfo[] = await Promise.all(
      recordList.map((record: any) => {
        const result = {
          _id: record._id,
          dream_color: record.dream_color,
          emotion: record.emotion,
          date: dayjs(record.date).format("YYYY/MM/DD (ddd)"),
          title: record.title,
          genre: record.genre,
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

const updateRecord = async (recordId: string, recordUpdateDto: RecordUpdateDto): Promise<RecordInfo | null | number> => {
  try {
    let exitCode = 0;
    const record = await Record.findById(recordId);
    if (!record) {
      exitCode = 1;
    }

    const update = recordUpdateDto;
    if (update.date === null) {
      exitCode = 2;
    }
    if (update.emotion < 0 || update.emotion > 6 || update.dream_color < 0 || update.dream_color > 6) {
      exitCode = 2;
    }

    let genre_error = false;
    let genre_count = 0;

    if (update.genre === null) {
      update.genre = [10];
      genre_count = 1;
    } else {
      update.genre.map((genre) => {
        genre_count++;
        if (genre < 0 || genre > 9) {
          genre_error = true;
        }
      });
    }

    if (genre_error || genre_count > 3 || genre_count === 0) {
      exitCode = 2;
    }

    if (update.emotion === null) {
      update.emotion = 7;
    }

    if (update.dream_color === null) {
      update.dream_color = 0;
    }

    if (exitCode != 0) {
      return exitCode;
    }

    const data = await Record.findOneAndUpdate(
      { _id: recordId }, //filter
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

const deleteRecord = async (recordId: string): Promise<boolean> => {
  try {
    const record = await Record.findByIdAndDelete(recordId);

    if (!record) return false;
    return true;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getRecordStorage = async (userId: string, filter: string): Promise<RecordStorageResponseDto | null> => {
  try {
    const userObjectId: mongoose.Types.ObjectId = userMocking[parseInt(userId) - 1];
    const user: UserResponseDto | null = await User.findById(userObjectId);

    if (!user) {
      return null;
    }

    let recordList;

    switch (filter) {
      case "0":
        // eslint-disable-next-line no-var
        recordList = await Record.find({ writer: userObjectId }).sort({ date: -1, _id: -1 });
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
        recordList = await Record.find({ $and: [{ writer: userObjectId }, { emotion: parseInt(filter) }] }).sort({
          date: -1,
          _id: -1,
        });
        break;
      default:
        return null;
    }

    let count = 0;

    const records: RecordListInfo[] = await Promise.all(
      recordList.map((record: any) => {
        const result = {
          _id: record._id,
          dream_color: record.dream_color,
          emotion: record.emotion,
          date: dayjs(record.date).format("YYYY/MM/DD (ddd)"),
          title: record.title,
          genre: record.genre,
        };
        count++;
        return result;
      })
    );

    const data = {
      records_count: count,
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
    const userObjectId: mongoose.Types.ObjectId = userMocking[parseInt(userId) - 1];
    const user: UserResponseDto | null = await User.findById(userObjectId);

    if (!user) {
      return null;
    }

    const Regex: RegExp = regex(keyword);

    const recordList = await Record.find({ $or: [{ content: { $regex: Regex } }, { note: { $regex: Regex } }] }).sort({
      date: -1,
      _id: -1,
    });

    let count = 0;

    const records: RecordListInfo[] = await Promise.all(
      recordList.map((record: any) => {
        const result = {
          _id: record._id,
          dream_color: record.dream_color,
          emotion: record.emotion,
          date: dayjs(record.date).format("YYYY/MM/DD (ddd)"),
          title: record.title,
          genre: record.genre,
        };
        count++;
        return result;
      })
    );

    const data = {
      records_count: count,
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
  getRecordList,
  updateRecord,
  deleteRecord,
  getRecordStorage,
  getRecordsBySearch,
};
