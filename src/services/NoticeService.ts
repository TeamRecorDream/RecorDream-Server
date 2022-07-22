import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { NoticeBaseDto } from "../interfaces/notice/NoticeBaseDto";
import Notice from "../models/Notice";
import User from "../models/User";
import mongoose from "mongoose";
import userMocking from "../models/UserMocking";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import pushMessage from "../modules/pushMessage";
import * as admin from "firebase-admin";
import schedule from "node-schedule";

const postNotice = async (noticeBaseDto: NoticeBaseDto, userId: string): Promise<PostBaseResponseDto | null | undefined> => {
  try {
    const userObjectId: mongoose.Types.ObjectId = userMocking[parseInt(userId) - 1];
    const user: UserResponseDto | null = await User.findById(userObjectId);

    // 유저가 없을 경우
    if (!user) {
      return null;
    }

    // 새로운 notice 객체 생성
    const notice = new Notice({
      fcm_token: noticeBaseDto.fcm_token,
      time: noticeBaseDto.time,
      is_active: true,
    });

    const data = {
      _id: notice._id,
    };

    // 새로운 notice의 fcm_token을 찾음
    const device = await User.find({ fcm_token: notice.fcm_token });

    // 근데 못찾으면 존재하지 않는 토큰이라는 에러 메시지 띄움
    if (device.length == 0) {
      return null;
    }

    // 시간 설정 시에 토큰 넣는데, 그 값이 유저 토큰에 없을 경우 (=제대로 안 만들어짐)
    if (user.fcm_token[0] !== notice.fcm_token && user.fcm_token[1] !== notice.fcm_token) {
      return null;
    }

    await notice.save();

    // 기기별 입력한 푸시알림 시간 확인
    const times = notice.time;
    console.log(times);

    const push_time = times as string;
    let is_day = true; // AM, PM 판별

    const parts = push_time.split(/:| /);

    const daynight: string[] = []; // for AM, PM
    const split_time: number[] = []; // for 시간, 분

    daynight.push(parts[0]);

    for (let i = 0; i < 2; i++) {
      split_time.push(parseInt(parts[i + 1]));
    }
    let hour = split_time[0];
    const min = split_time[1];

    if (daynight[0] === "AM" || daynight[0] === "am") {
      is_day = true;
    }
    if (daynight[0] === "PM" || daynight[0] === "pm") {
      is_day = false;
    }

    if (is_day === false && hour !== 12) hour += 12; // 오후
    if (is_day === true && hour === 12) hour = 0;
    console.log(hour);

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
      token: notice.fcm_token,
    };

    schedule.scheduleJob({ hour: hour, minute: min }, function () {
      // 푸시알림 보내기
      admin
        .messaging()
        .send(alarms)
        .then(function (response: any) {
          console.log("Successfully sent message: ", response);
        })
        .catch(function (err) {
          console.log("Error Sending message!!! : ", err);
        });
    });

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateNotice = async (noticeBaseDto: NoticeBaseDto, userId: string, noticeId: string) => {
  try {
    const userObjectId: mongoose.Types.ObjectId = userMocking[parseInt(userId) - 1];
    const user: UserResponseDto | null = await User.findById(userObjectId);

    // 유저가 없을 경우
    if (!user) {
      return null;
    }

    const updatedUserTime = {
      time: noticeBaseDto.time,
    };

    // 시간 수정 시에 토큰 넣는데, 그 값이 유저 토큰에 없을 경우
    if (user.fcm_token[0] !== noticeBaseDto.fcm_token && user.fcm_token[1] !== noticeBaseDto.fcm_token) {
      return null;
    }

    // 시간 수정 ㄱㄱ
    await Notice.updateOne({ _id: noticeId }, { time: updatedUserTime.time }).exec();
    // 수정된 토큰을 가진 notice를 찾음
    const notice = await Notice.find({ fcm_token: noticeBaseDto.fcm_token });

    // 기기별 입력한 푸시알림 시간 확인
    const times = notice[0].time;
    console.log(times);

    const push_time = times as string;
    let is_day = true; // AM, PM 판별

    const parts = push_time.split(/:| /);

    const daynight: string[] = []; // for AM, PM
    const split_time: number[] = []; // for 시간, 분

    daynight.push(parts[0]);

    for (let i = 0; i < 2; i++) {
      split_time.push(parseInt(parts[i + 1]));
    }
    let hour = split_time[0];
    const min = split_time[1];

    if (daynight[0] === "AM" || daynight[0] === "am") {
      is_day = true;
    }
    if (daynight[0] === "PM" || daynight[0] === "pm") {
      is_day = false;
    }

    if (is_day === false && hour !== 12) hour += 12; // 오후
    if (is_day === true && hour === 12) hour = 0;
    console.log(hour);

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
      token: notice[0].fcm_token,
    };

    schedule.scheduleJob({ hour: hour, minute: min }, function () {
      // 푸시알림 보내기
      admin
        .messaging()
        .send(alarms)
        .then(function (response: any) {
          console.log("Successfully sent message: ", response);
        })
        .catch(function (err) {
          console.log("Error Sending message!!! : ", err);
        });
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  postNotice,
  updateNotice,
};
