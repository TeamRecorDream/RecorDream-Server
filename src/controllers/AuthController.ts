import { Request, Response } from "express";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import { sendMessageToSlack } from "../modules/slackAPI";
import { slackMessage } from "../modules/returnToSlackMessage";
import AuthService from "../services/AuthService";
import { AuthLogoutDto } from "../interfaces/auth/AuthLogoutDto";
import exceptionMessage from "../modules/exceptionMessage";

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
      user = await AuthService.appleLogin(appleToken, fcmToken);
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

/**
 * @route POST /auth/token
 * @desc access token refresh
 * @access Private
 */
const reissueToken = async (req: Request, res: Response) => {
  const accessToken = req.headers.access as string;
  const refreshToken = req.headers.refresh as string;

  if (!accessToken || !refreshToken) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE_TOKEN));
  }

  try {
    const data = await AuthService.reissueToken(accessToken, refreshToken);

    if (data === "invalid_token") {
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.INVALID_TOKEN));
    }

    if (data === "all_expired_token") {
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.ALL_EXPIRED_TOKEN));
    }

    if (data === "valid_token") {
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.VALID_TOKEN));
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, message.REISSUE_TOKEN_SUCCESS, data));
  } catch (err) {
    console.log(err);

    const errorMessage: string = slackMessage(req.method.toUpperCase(), req.originalUrl, err, req.body.user?.id);
    sendMessageToSlack(errorMessage);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 * @Route PATCH /auth/logout
 * @desc social logout
 * @access Private
 */
const socialLogout = async (req: Request, res: Response) => {
  const authLogoutDto: AuthLogoutDto = req.body;

  try {
    const data = await AuthService.socialLogout(authLogoutDto);

    if (data === null) {
      res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }

    if (data === exceptionMessage.NOT_FOUND_FCM) {
      console.log("여기?");
      res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.INVALID_TOKEN));
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, message.LOGOUT_SUCCESS));
  } catch (err) {
    console.log(err);

    const errorMessage: string = slackMessage(req.method.toUpperCase(), req.originalUrl, err, req.body.user?.id);
    sendMessageToSlack(errorMessage);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  socailLogin,
  reissueToken,
  socialLogout,
};
