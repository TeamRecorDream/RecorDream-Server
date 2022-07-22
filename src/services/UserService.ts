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

    const device = await Notice.find({ fcm_token: fcm_token });

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
  dayjs.locale("en");
  try {
    const userObjectId: mongoose.Types.ObjectId = userMocking[parseInt(userId) - 1];
    const user: UserResponseDto | null = await User.findById(userObjectId);

    if (!user) {
      return null;
    }

    const token = userAlarmDto.fcm_token;
    const device = await Notice.find({ fcm_token: token });
    //console.log(device);

    if (device.length == 0) {
      return null;
    }

    // toggle parameter 값이 1이면 푸시알림 설정 O
    if (toggle == "1") {
      device[0].is_active = true;

      if (device[0].time === null) {
        device[0].time = dayjs().format("A hh:mm");
      }
    }
    // toggle parameter 값이 0이면 푸시알림 설정 X
    if (toggle == "0") {
      device[0].is_active = false;
      device[0].time = null;
      await Notice.deleteOne({ fcm_token: device[0].fcm_token });
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

  try {
    const user = await User.findById(userObjectId);

    if (!user) {
      return null;
    }

    const tokens = {
      fcm_token: fcmTokenUpdateDto.fcm_token,
      new_token: fcmTokenUpdateDto.new_token,
    };

    if (user.fcm_token[0] !== tokens.fcm_token && user.fcm_token[1] !== tokens.fcm_token) {
      return null;
    }

    if (user.fcm_token[0] === tokens.fcm_token) {
      await User.updateOne({ fcm_token: tokens.fcm_token }, { "fcm_token.$": tokens.new_token }).exec();
    }
    if (user.fcm_token[1] === tokens.fcm_token) {
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
