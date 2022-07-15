import mongoose from "mongoose";
import { FcmTokenUpdateDto } from "../interfaces/user/FcmTokenUpdateDto";
import { UserNicknameUpdateDto } from "../interfaces/user/UserNicknameUpdateDto";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import User from "../models/User";
import userMocking from "../models/UserMocking";

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

const changeToggle = async (userId: string, toggle: string) => {
  try {
    const userObjectId: mongoose.Types.ObjectId = userMocking[parseInt(userId) - 1];
    const user: UserResponseDto | null = await User.findById(userObjectId);

    if (!user) {
      return null;
    }

    // toggle parameter 값이 1이면 푸시알림 설정 O
    if (toggle == "1") {
      user.is_notified = true;
      // toggle parameter 값이 0이면 푸시알림 설정 X
    } else if (toggle == "0") {
      user.is_notified = false;
    }

    await User.findByIdAndUpdate(userObjectId, user).exec();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// userId: parmas, fcmToken: req.body -> 즉, 유저의 fcm token을 하나하나 업데이트 (fcm token이 여러 개면 여러번 해야함)
const updateFcmToken = async (userId: string, fcmTokenUpdateDto: FcmTokenUpdateDto) => {
  const { fcm_token } = fcmTokenUpdateDto;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return undefined;
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
