import mongoose from "mongoose";
import { FcmTokenUpdateDto } from "../interfaces/user/FcmTokenUpdateDto";
import { UserNicknameUpdateDto } from "../interfaces/user/UserNicknameUpdateDto";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import User from "../models/User";
import userMocking from "../models/UserMocking";
import * as admin from "firebase-admin";
import schedule from "node-schedule";
import { UserAlarmDto } from "../interfaces/user/UserAlarmDto";

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

const getUser = async (userId: string) => {
  try {
    const userObjectId: mongoose.Types.ObjectId = userMocking[parseInt(userId) - 1];
    const user: UserResponseDto | null = await User.findById(userObjectId);

    if (!user) {
      return null;
    }

    // 조회할 회원정보가 있고
    // is_notified가 false 일 때
    if (user.is_notified == false) {
      user.time = null;
    }
    const result = {
      nickname: user.nickname,
      email: user.email,
      is_notified: user.is_notified,
      time: user.time,
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

    // toggle parameter 값이 1이면 푸시알림 설정 O
    if (toggle == "1") {
      user.is_notified = true;

      // 유저가 입력한 시간 확인
      const push_time = user.time as string;
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
      const tokens = userAlarmDto.fcm_token;
      console.log(tokens);

      let fcm_error = true;

      if (user.fcm_token[0] === tokens || user.fcm_token[1] === tokens) {
        fcm_error = false;
      }

      if (fcm_error === true) {
        return null;
      }

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
    }
    // toggle parameter 값이 0이면 푸시알림 설정 X
    if (toggle == "0") {
      user.is_notified = false;
    }

    await User.findByIdAndUpdate(userObjectId, user).exec();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// userId: params, fcm_token: req.body -> 즉, 유저의 fcm token을 하나하나 업데이트 (fcm token이 여러 개면 여러번 해야함)
const updateFcmToken = async (userId: string, fcmTokenUpdateDto: FcmTokenUpdateDto) => {
  const { fcm_token } = fcmTokenUpdateDto;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return null;
    }

    const filter = {
      _id: userId,
    };

    const update = { fcm_token };
    const updatedUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    });

    return updatedUser;
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
