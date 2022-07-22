import mongoose from "mongoose";
import { FcmTokenUpdateDto } from "../interfaces/user/FcmTokenUpdateDto";
import { UserNicknameUpdateDto } from "../interfaces/user/UserNicknameUpdateDto";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import User from "../models/User";
import userMocking from "../models/UserMocking";
import * as admin from "firebase-admin";
import schedule from "node-schedule";
import { UserAlarmDto } from "../interfaces/user/UserAlarmDto";
import Notice from "../models/Notice";
import pushMessage from "../modules/pushMessage";
import dayjs from "dayjs";
dayjs.locale("en");

const updateNickname = async (userId: string, userUpdateDto: UserNicknameUpdateDto) => {
  try {
    const userObjectId: mongoose.Types.ObjectId = userMocking[parseInt(userId) - 1];
    const updatedNickname = {
      nickname: userUpdateDto.nickname,
    };

    await User.findByIdAndUpdate(userObjectId, updatedNickname);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getUser = async (userId: string, fcm_token: string) => {
  try {
    const userObjectId: mongoose.Types.ObjectId = userMocking[parseInt(userId) - 1];
    const user: UserResponseDto | null = await User.findById(userObjectId);

    const token = fcm_token;
    const device = await Notice.find({ fcm_token: token });

    if (!user || !device[0]) {
      return null;
    }

    // 조회할 회원정보가 있고
    // is_active가 false 일 때
    if (device[0].is_active == false) {
      device[0].time = null;
    }
    const result = {
      nickname: user.nickname,
      email: user.email,
      is_active: device[0].is_active,
      time: device[0].time,
      is_deleted: user.is_deleted,
    };
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const changeToggle = async (userId: string, toggle: string, userAlarmDto: UserAlarmDto) => {
  try {
    const userObjectId: mongoose.Types.ObjectId = userMocking[parseInt(userId) - 1];
    const user: UserResponseDto | null = await User.findById(userObjectId);

    if (!user) {
      return null;
    }

    const token = userAlarmDto.fcm_token;
    const device = await Notice.find({ fcm_token: token });

    if (!device) {
      console.log("에러 캐치");
      return null;
    }

    // toggle parameter 값이 1이면 푸시알림 설정 O
    if (toggle == "1") {
      device[0].is_active = true;

      if (device[0].time === null) {
        device[0].time = dayjs().format("A hh:mm");
        console.log(device[0].time);
      }

      // 기기별 입력한 푸시알림 시간 확인
      const times = device[0].time;
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

      if (daynight[0] === "AM" || daynight[0] === "am" || daynight[0] === "오전") {
        console.log("오전");
        is_day = true;
      }
      if (daynight[0] === "PM" || daynight[0] === "pm" || daynight[0] === "오후") {
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
        token: token,
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
    }
    // toggle parameter 값이 0이면 푸시알림 설정 X
    if (toggle == "0") {
      device[0].is_active = false;
      device[0].time = null;
    }

    await Notice.updateOne({ fcm_token: token }, { is_active: device[0].is_active, time: device[0].time }).exec();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// fcm_token: req.body -> 즉, 유저의 fcm token을 하나하나 업데이트 (fcm token이 여러 개면 여러번 해야함)
const updateFcmToken = async (userId: string, fcmTokenUpdateDto: FcmTokenUpdateDto) => {
  const userObjectId: mongoose.Types.ObjectId = userMocking[parseInt(userId) - 1];

  //const { fcm_token, new_token } = fcmTokenUpdateDto;

  try {
    const user = await User.findById(userObjectId);

    if (!user) {
      return null;
    }

    const tokens = {
      fcm_token: fcmTokenUpdateDto.fcm_token,
      new_token: fcmTokenUpdateDto.new_token,
    };

    const fcm1 = user.fcm_token[0];
    const fcm2 = user.fcm_token[1];

    if (user.fcm_token[0] !== tokens.fcm_token && user.fcm_token[1] !== tokens.fcm_token) {
      console.log("걸렸다");
      return null;
    }

    if (user.fcm_token[0] === tokens.fcm_token) {
      await User.updateOne({ fcm_token: tokens.fcm_token }, { "fcm_token.$": tokens.new_token }).exec();
    }
    if (fcm2 === tokens.fcm_token) {
      await User.updateOne({ fcm_token: tokens.fcm_token }, { "fcm_token.$": tokens.new_token }).exec();
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  updateNickname,
  getUser,
  changeToggle,
  updateFcmToken,
};
