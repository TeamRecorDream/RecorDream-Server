import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { NoticeBaseDto } from "../interfaces/notice/NoticeBaseDto";
import Notice from "../models/Notice";
import User from "../models/User";
import mongoose from "mongoose";
import userMocking from "../models/UserMocking";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import { NoticeInfo } from "../interfaces/notice/NoticeInfo";

const postNotice = async (noticeBaseDto: NoticeBaseDto, userId: string): Promise<PostBaseResponseDto | null> => {
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

    const device = await Notice.find({});

    for (let i = 0; i < device.length; i++) {
      if (device[i].fcm_token === notice.fcm_token) {
        return null;
      }
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

const updateNotice = async (noticeId: string, noticeBaseDto: NoticeBaseDto, userId: string): Promise<NoticeInfo | null> => {
  try {
    const userObjectId: mongoose.Types.ObjectId = userMocking[parseInt(userId) - 1];
    const user: UserResponseDto | null = await User.findById(userObjectId);

    if (!user) {
      return null;
    }

    const updatedUserTime = {
      time: noticeBaseDto.time,
    };

    let fcm_error = true;
    if (user.fcm_token[0] === noticeBaseDto.fcm_token || user.fcm_token[1] === noticeBaseDto.fcm_token) {
      fcm_error = false;
    }
    if (fcm_error === true) {
      return null;
    }

    const notice = await Notice.findByIdAndUpdate(noticeId, updatedUserTime).exec();

    // User time도 변경
    await User.findByIdAndUpdate(userObjectId, updatedUserTime).exec();

    return notice;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  postNotice,
  updateNotice,
};
