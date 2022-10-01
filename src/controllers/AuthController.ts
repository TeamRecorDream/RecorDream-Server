import { Request, Response } from "express";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import { sendMessageToSlack } from "../modules/slackAPI";
import { slackMessage } from "../modules/returnToSlackMessage";
import AuthService from "../services/AuthService";

/**
 * @route POST /auth/login
 * @desc POST social login
 * @access Public
 */
const socailLogin = async (req: Request, res: Response) => {
  const { kakaoToken, appleToken, fcmToken } = req.body;
  let user;

  try {
    // 카카오 로그인
    if (!appleToken) {
      user = await AuthService.kakaoLogin(kakaoToken, fcmToken);
    }
    // 애플로그인
    if (!kakaoToken) {
      //user = await AuthService.appleLogin(appleToken, fcmToken);
    }

    if (user === null) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.INVALID_TOKEN));
    }

    // fcmToken이 없거나 kakaoToken과 appleToken이 둘 다 없으면 에러
    if (!fcmToken || (!kakaoToken && !appleToken)) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    // kakaoToken과 appleToken이 둘 다 있어도 에러
    if (kakaoToken && appleToken) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.ONE_TOKEN));
    }

    if (user?.isAlreadyUser === false) {
      return res.status(statusCode.OK).send(util.success(statusCode.OK, message.SIGNUP_SUCCESS, user));
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, message.SIGNIN_SUCCESS, user));
  } catch (err) {
    console.log(err);
    const errorMessage: string = slackMessage(req.method.toUpperCase(), req.originalUrl, err, req.body.user?.id);
    sendMessageToSlack(errorMessage);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  socailLogin,
};
