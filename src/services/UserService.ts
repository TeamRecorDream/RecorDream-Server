import mongoose from "mongoose";
import { UserUpdateDto } from "../interfaces/user/UserUpdateDto";
import User from "../models/User";
import userMocking from "../models/UserMocking";

const updateNickname = async (userId: string, userUpdateDto: UserUpdateDto) => {
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
