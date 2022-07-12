import mongoose from "mongoose";
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

    // 조회할 회원정보가 있고
    if (user !== null) {
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
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const changeToggle = async (userId: string, toggle: string) => {
  try {
    const userObjectId: mongoose.Types.ObjectId = userMocking[parseInt(userId) - 1];
    // 우린 앱잼단에서 임의의 유저를 사용하기 때문에 여기서 null이 될 수 없음
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

export default {
  updateNickname,
  getUser,
  changeToggle,
};
