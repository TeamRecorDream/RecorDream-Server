import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";

export default (req: Request, res: Response, next: NextFunction) => {
  // request-header 에서 토큰 받아오기
  const token = req.headers["authorization"]?.split(" ").reverse()[0];

  // 토큰 유무 검증
  if (!token) {
    return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.NULL_VALUE_TOKEN));
  }

  // 토큰 검증
  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    req.body.user = (decoded as any).user;

    next();
  } catch (err: any) {
    console.log(err);

    if (err.name === "TokenExpiredError") {
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.INTERNAL_SERVER_ERROR));
    }
  }
};
