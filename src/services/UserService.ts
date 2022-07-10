import mongoose from "mongoose";
import { UserNicknameUpdateDto } from "../interfaces/user/UserNicknameUpdateDto";
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

export default {
  updateNickname,
};
