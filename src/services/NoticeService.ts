import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { NoticeBaseDto } from "../interfaces/notice/NoticeBaseDto";
import Notice from "../models/Notice";
import User from "../models/User";
import mongoose from "mongoose";
import userMocking from "../models/UserMocking";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";

const postNotice = async (noticeBaseDto: NoticeBaseDto, userId: string): Promise<PostBaseResponseDto | null | undefined> => {
  try {
    const userObjectId: mongoose.Types.ObjectId = userMocking[parseInt(userId) - 1];
    const user: UserResponseDto | null = await User.findById(userObjectId);

    if (!user) {
      return null;
    }

    const notice = new Notice(noticeBaseDto);

    const data = {
      _id: notice._id,
    };

    const device = await Notice.find({ fcm_token: notice.fcm_token });

    if (device.length == 0) {
      return null;
    }

    // 이미 시간 설정한 fcm 인지 확인
    if (device[0].time === null) {
      await Notice.deleteOne({ fcm_token: notice.fcm_token });
    }
    if (device[0].time !== null) {
      return undefined;
    }

    if (user.fcm_token[0] !== notice.fcm_token && user.fcm_token[1] !== notice.fcm_token) {
      return null;
    }

    await notice.save();

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateNotice = async (noticeBaseDto: NoticeBaseDto, userId: string) => {
  try {
    const userObjectId: mongoose.Types.ObjectId = userMocking[parseInt(userId) - 1];
    const user: UserResponseDto | null = await User.findById(userObjectId);

    if (!user) {
      return null;
    }

    const updatedUserTime = {
      time: noticeBaseDto.time,
    };

    if (user.fcm_token[0] !== noticeBaseDto.fcm_token && user.fcm_token[1] !== noticeBaseDto.fcm_token) {
      return null;
    }

    await Notice.updateOne({ fcm_token: noticeBaseDto.fcm_token }, { time: updatedUserTime.time }).exec();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  postNotice,
  updateNotice,
};
