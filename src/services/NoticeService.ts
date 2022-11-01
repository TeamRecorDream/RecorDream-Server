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
import { NoticeOffDto } from "../interfaces/notice/NoticeOffDto";

const postNotice = async (noticeBaseDto: NoticeBaseDto, userId: string): Promise<PostBaseResponseDto | null | undefined> => {
  try {
    const userObjectId: mongoose.Types.ObjectId = userMocking[parseInt(userId) - 1];
    const user: UserResponseDto | null = await User.findById(userObjectId);

    // 유저가 없을 경우
    if (!user) {
      return null;
    }

    // Notice에 있는 fcm_token 찾기 (등록된 기기인지)
    const d = await Notice.find({ fcmToken: noticeBaseDto.fcmToken });

    // 등록되지 않은 기기일 경우
    if (d.length == 0) {
      // 새로운 notice 객체 생성
      const notice = new Notice({
        fcmToken: noticeBaseDto.fcmToken,
        time: noticeBaseDto.time,
        isActive: true,
      });

      const data = {
        _id: notice._id,
      };

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
        token: notice.fcmToken,
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

      await notice.save();

      return data;
    }
    // 이미 등록된 기기일 경우
    else {
      await Notice.updateOne({ fcm_token: noticeBaseDto.fcmToken }, { time: noticeBaseDto.time }).exec();

      const notice = await Notice.find({ fcm_token: noticeBaseDto.fcmToken });

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
        token: notice[0].fcmToken,
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

    // 새로운 notice의 fcm_token을 찾음
    //const device = await User.find({ fcm_token: notice.fcm_token });

    // 근데 못찾으면 존재하지 않는 토큰이라는 에러 메시지 띄움
    //if (device.length == 0) {
    //  return null;
    //}

    // 시간 설정 시에 토큰 넣는데, 그 값이 유저 토큰에 없을 경우 (=제대로 안 만들어짐)
    //if (user.fcm_token[0] !== d[0].fcm_token && user.fcm_token[1] !== d[0].fcm_token) {
    //  return null;
    //}
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
    if (user.fcm_token[0] !== noticeBaseDto.fcmToken && user.fcm_token[1] !== noticeBaseDto.fcmToken) {
      return null;
    }

    // 시간 수정 ㄱㄱ
    await Notice.updateOne({ _id: noticeId }, { time: updatedUserTime.time }).exec();

    // 수정된 토큰을 가진 notice를 찾음
    const notice = await Notice.find({ fcm_token: noticeBaseDto.fcmToken });

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
      token: notice[0].fcmToken,
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

// 푸시알림 끄기
const toggleOff = async (noticeOffDto: NoticeOffDto) => {
  try {
    const fcmToken = noticeOffDto.fcmToken;
    const device = await Notice.find({ fcmTokens: fcmToken });

    if (device.length === 0) {
      return null;
    }

    device[0].time = null;
    device[0].isActive = false;

    await Notice.updateOne({ fcmTokens: fcmToken }, { isActive: device[0].isActive, time: device[0].time }).exec();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  postNotice,
  updateNotice,
  toggleOff,
};
