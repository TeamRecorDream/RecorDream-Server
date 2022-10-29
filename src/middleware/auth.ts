import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import User from "../models/User";
import jwtHandler from "../modules/jwtHandler";
import exceptionMessage from "../modules/exceptionMessage";

export default (req: Request, res: Response, next: NextFunction) => {
  // request-header 에서 토큰 받아오기
  const token = req.headers["authorization"]?.split(" ").reverse()[0];

  // 토큰 유무 검증
  if (!token) {
    return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.NULL_VALUE_TOKEN));
  }

  // 토큰 검증
  try {
    const decoded = jwtHandler.verifyToken(token);

    if (decoded === exceptionMessage.EXPIRED_TOKEN) {
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.EXPIRED_TOKEN));
    }

    if (decoded === exceptionMessage.INVALID_TOKEN) {
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.INVALID_TOKEN));
    }

    const userId = (decoded as JwtPayload).user;
    if (!userId) {
      return res.status(statusCode.FORBIDDEN).send(util.fail(statusCode.FORBIDDEN, message.INVALID_TOKEN));
    }

    const user = User.findById(userId.id);
    if (!user) {
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.NO_USER));
    }

    req.body.user = userId;

    next();
  } catch (err: any) {
    console.log(err);

    if (err.name === "TokenExpiredError") {
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.INTERNAL_SERVER_ERROR));
    }
  }
};
