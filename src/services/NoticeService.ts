import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { NoticeBaseDto } from "../interfaces/notice/NoticeBaseDto";
import Notice from "../models/Notice";
import User from "../models/User";
import * as admin from "firebase-admin";
import schedule from "node-schedule";
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

    await notice.save();

    const data = {
      _id: notice._id,
    };

    // User time도 변경
    const updatedUserTime = {
      time: noticeBaseDto.time,
    };

    await User.findByIdAndUpdate(userObjectId, updatedUserTime).exec();

    // 유저가 입력한 시간 확인
    const push_time = notice.time;
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
      console.log("오전!");
    }
    if (daynight[0] === "PM" || daynight[0] === "pm") {
      is_day = false;
      console.log("오후!");
    }

    if ((is_day === false && hour !== 12) || (is_day === true && hour === 12)) hour += 12; // 오후

    // 푸시알림 설정
    const tokens = noticeBaseDto.fcm_token;

    const alarms = {
      android: {
        data: {
          title: "Recordream",
          body: "방금 꾼 꿈, 잊어버리기 전에 기록해볼까요?",
        },
      },
      apns: {
        payload: {
          aps: {
            contentAvailable: true,
            alert: {
              title: "Recordream",
              body: "방금 꾼 꿈, 잊어버리기 전에 기록해볼까요?",
            },
          },
        },
      },
      token: tokens,
    };

    // 푸시알림 보내기
    admin
      .messaging()
      .send(alarms)
      .then(function (response: any) {
        schedule.scheduleJob({ hour: hour, minute: min }, function () {
          console.log("스케줄러 성공!");
        });
        console.log("Successfully sent message: ", response);
      })
      .catch(function (err) {
        console.log("Error Sending message!!! : ", err);
      });

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
      is_changed: noticeBaseDto.is_changed,
    };

    updatedUserTime.is_changed = true;

    const notice = await Notice.findByIdAndUpdate(noticeId, updatedUserTime).exec();

    // User time도 변경
    await User.findByIdAndUpdate(userObjectId, updatedUserTime).exec();

    const push_time = updatedUserTime.time;
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
      console.log("오전!");
    }
    if (daynight[0] === "PM" || daynight[0] === "pm") {
      is_day = false;
      console.log("오후!");
    }

    if ((is_day === false && hour !== 12) || (is_day === true && hour === 12)) hour += 12; // 오후라는 소리

    schedule.scheduleJob({ hour: hour, minute: min }, function () {
      console.log("스케줄러 성공!");
    });

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
