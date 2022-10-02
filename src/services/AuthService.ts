import axios from "axios";
import User from "../models/User";
import jwt from "jsonwebtoken";
import jwtHandler from "../modules/jwtHandler";
import { AuthResponseDto } from "../interfaces/auth/AuthResponseDto";

const kakaoLogin = async (kakaoToken: string, fcmToken: string): Promise<AuthResponseDto | null> => {
  try {
    // 카카오 서버와 연결
    const response = await axios({
      method: "GET",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${kakaoToken}`, // 클라한테 받은 accessToken
      },
    });

    if (!response) {
      return null;
    }

    const userData = response.data.kakao_account;

    const email = userData.email;
    const nickname = userData.nickname;
    const gender = userData.gender;
    const age_range = userData.age_range;

    const existUser = await User.findOne({
      email: email,
    });

    // db에 유저가 없으면 회원 가입
    if (!existUser) {
      const user = new User({
        isAlreadyUser: false,
        nickname: nickname,
        email: email,
        gender: gender || null,
        age_range: age_range || null,
        fcmToken: fcmToken,
      });

      const jwtToken = jwtHandler.getAccessToken(user.id);
      user.accessToken = jwtToken;

      const refreshToken = jwtHandler.getRefreshToken();
      user.refreshToken = refreshToken;

      await user.save();

      const data: AuthResponseDto = {
        isAlreadyUser: false,
        accessToken: user.accessToken,
        refreshToken: refreshToken,
        nickname: nickname,
      };

      return data;
    }

    // 유저가 있으면 로그인 처리
    const accessToken = jwtHandler.getAccessToken(existUser._id);
    const refreshToken = jwtHandler.getRefreshToken();

    existUser.isAlreadyUser = true;

    // 한 유저가 여러 기기로 로그한 경우
    if (!existUser.fcmToken.includes(fcmToken)) {
      existUser.fcmToken.push(fcmToken);
    }

    await User.findByIdAndUpdate(existUser._id, existUser);

    const data: AuthResponseDto = {
      isAlreadyUser: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
      nickname: nickname,
    };

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  kakaoLogin,
};
