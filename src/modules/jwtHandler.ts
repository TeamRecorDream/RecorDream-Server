import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import config from "../config";
import { JwtPayloadInfo } from "../interfaces/common/JwtPayloadInfo";
import exceptionMessage from "../modules/exceptionMessage";

const getAccessToken = (userId: mongoose.Schema.Types.ObjectId): string => {
  const payload: JwtPayloadInfo = {
    user: {
      id: userId,
    },
  };

  const accessToken: string = jwt.sign(payload, config.jwtSecret, { expiresIn: process.env.ACEESSTOKEN_EXPIRE });

  return accessToken;
};

// Refresh Token 발급 (payload 없음)
const getRefreshToken = (): string => {
  const refreshToken: string = jwt.sign({}, config.jwtSecret, { expiresIn: process.env.REFRESHTOKEN_EXPIRE });

  return refreshToken;
};

// JWT 토큰 인증
const verifyToken = (token: string) => {
  let decoded;
  try {
    decoded = jwt.verify(token, config.jwtSecret);
  } catch (err: any) {
    console.log(err);

    if (err.message === "jwt expired") {
      return exceptionMessage.EXPIRED_TOKEN;
    } else {
      return exceptionMessage.INVALID_TOKEN;
    }
  }
  return decoded;
};

export default {
  getAccessToken,
  getRefreshToken,
  verifyToken,
};
