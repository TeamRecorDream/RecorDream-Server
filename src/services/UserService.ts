import mongoose from "mongoose";
import { FcmTokenUpdateDto } from "../interfaces/user/FcmTokenUpdateDto";
import { UserNicknameUpdateDto } from "../interfaces/user/UserNicknameUpdateDto";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import User from "../models/User";
import userMocking from "../models/UserMocking";
import pushMessage from "../modules/pushMessage";
import * as admin from "firebase-admin";
import { UserNoticeBaseDto } from "../interfaces/user/UserNoticeBaseDto";
import Agenda from "agenda";
import config from "../config";
import exceptionMessage from "../modules/exceptionMessage";
import { ToggleChangeDto } from "../interfaces/user/ToggleChangeDto";

// agenda setting
const agenda = new Agenda({
  db: { address: config.mongoURI },
});

const updateNickname = async (userId: string, userNicknameUpdateDto: UserNicknameUpdateDto) => {
  try {
    const updatedNickname = {
      nickname: userNicknameUpdateDto.nickname,
    };

    const user = await User.findByIdAndUpdate(userId, updatedNickname);

    if (!user) {
      return null;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getUser = async (userId: string, fcm_token: string) => {
  try {
    const userObjectId: mongoose.Types.ObjectId = userMocking[parseInt(userId) - 1];
    const user: UserResponseDto | null = await User.findById(userObjectId);

    const device = await User.find({ fcm_token: fcm_token });

    if (!user || !device[0]) {
      return null;
    }

    // 조회할 회원정보가 있고
    // is_active가 false 일 때
    //if (device[0].is_active == false) {
    //device[0].time = null;
    //}
    const result = {
      nickname: user.nickname,
      email: user.email,
      is_active: device[0].isActive,
      time: device[0].time,
      is_deleted: user.is_deleted,
    };
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// fcm_token: req.body -> 즉, 유저의 fcm token을 하나하나 업데이트 (fcm token이 여러 개면 여러번 해야함)
const updateFcmToken = async (userId: string, fcmTokenUpdateDto: FcmTokenUpdateDto) => {
  const userObjectId: mongoose.Types.ObjectId = userMocking[parseInt(userId) - 1];

  try {
    const user = await User.findById(userObjectId);

    if (!user) {
      return null;
    }

    const tokens = {
      fcm_token: fcmTokenUpdateDto.fcm_token,
      new_token: fcmTokenUpdateDto.new_token,
    };

    if (user.fcmTokens[0] !== tokens.fcm_token && user.fcmTokens[1] !== tokens.fcm_token) {
      return null;
    }

    if (user.fcmTokens[0] === tokens.fcm_token) {
      await User.updateOne({ fcm_token: tokens.fcm_token }, { "fcm_token.$": tokens.new_token }).exec();
    }
    if (user.fcmTokens[1] === tokens.fcm_token) {
      await User.updateOne({ fcm_token: tokens.fcm_token }, { "fcm_token.$": tokens.new_token }).exec();
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteUser = async (userId: string) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return null;
    }

    await User.deleteOne({ _id: userId });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const saveNotice = async (noticeBaseDto: UserNoticeBaseDto) => {
  try {
    const updatedTime = {
      time: noticeBaseDto.time,
    };

    await User.findByIdAndUpdate(noticeBaseDto.userId, updatedTime).exec();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// 푸시알림 여부 변경
let test = 1;
const toggleChange = async (userId: string) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return null;
    }

    if (user.isActive === true) {
      user.time = null;
      user.isActive = false;
    }

    // 토글이 on이면 푸시알림 보내기
    else {
      user.isActive = true;

      if (user.time === null) {
        console.log("여기?");
        return null;
      }

      const time = user.time;

      // 푸시알림 설정
      const alarms = {
        android: {
          data: {
            title: pushMessage.title,
            body: pushMessage.body,
          },
        },
        apns: {
          payload: {
            aps: {
              contentAvailable: true,
              alert: {
                title: pushMessage.title,
                body: pushMessage.body,
              },
            },
          },
        },
        tokens: user.fcmTokens,
      };

      // 실행할 작업 정의
      agenda.define("pushAlarm", async (job, done) => {
        if (!job.attrs.data) return null;

        const allJobs = await agenda.jobs({ "data.userId": user._id });
        console.log("과연: ", allJobs.length);

        if (allJobs.length > 1) {
          console.log("이전 예약 취소");
          agenda.cancel({ "data.count": job.attrs.data.count });
        }
        if (allJobs.length === 1) {
          admin
            .messaging()
            .sendMulticast(alarms)
            .then(function (res: any) {
              console.log("Successfully sent message: ", res);
            })
            .catch(function (err) {
              console.log("Error Sending message!!! : ", err);
            });
        }
        job.repeatEvery("24 hours");
        job.save();

        console.log("예약 수: ", allJobs.length);

        done();
      });

      const timeSplit = time.split(/ /);
      const ampm = timeSplit[0];
      const pushTime = timeSplit[1];

      console.log("today at " + pushTime + ampm + "");

      agenda.start();
      agenda.schedule("today at " + pushTime + ampm + "", "pushAlarm", { userId: user._id, count: test });
      test += 1;

      const allJobs = await agenda.jobs({ "data.userId": user._id });
      console.log("현재 예약 수: ", allJobs.length);
    }

    await User.updateOne({ _id: userId }, { $set: { time: user.time, isActive: user.isActive } }).exec();

    const data = {
      isActive: user.isActive,
    };

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  updateNickname,
  getUser,
  updateFcmToken,
  deleteUser,
  saveNotice,
  toggleChange,
};
