import { Request, Response } from "express";
import { UserNicknameUpdateDto } from "../interfaces/user/UserNicknameUpdateDto";
import { validationResult } from "express-validator";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import UserService from "../services/UserService";
import { FcmTokenUpdateDto } from "../interfaces/user/FcmTokenUpdateDto";
import { UserAlarmDto } from "../interfaces/user/UserAlarmDto";
import { sendMessageToSlack } from "../modules/slackAPI";
import { slackMessage } from "../modules/returnToSlackMessage";

/**
 * @route PUT /user/nickname
 * @desc Update User Nickname
 * @access Public
 */
const updateNickname = async (req: Request, res: Response) => {
  const err = validationResult(req);
  const userUpdateDto: UserNicknameUpdateDto = req.body;
  const userId = req.header("userId");

  try {
    if (!userId || !err.isEmpty()) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.UPDATE_NICKNAME_FAIL));
    }

    await UserService.updateNickname(userId as string, userUpdateDto);

    res.status(statusCode.OK).send(util.success(statusCode.OK, message.UPDATE_NICKNAME_SUCCESS));
  } catch (err) {
    console.log(err);
    const errorMessage: string = slackMessage(req.method.toUpperCase(), req.originalUrl, err, req.body.user?.id);
    sendMessageToSlack(errorMessage);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 * @route GET /user
 * @desc Get User
 * @access Public
 */
const getUser = async (req: Request, res: Response) => {
  const err = validationResult(req);
  const userId = req.header("userId");
  const fcm_token: string = req.params.token;
  //const userAlarmDto: UserAlarmDto = req.body;

  try {
    const data = await UserService.getUser(userId as string, fcm_token);
    if (!userId || !err.isEmpty()) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    return res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_USER_SUCCESS, data));
  } catch (err) {
    console.log(err);
    const errorMessage: string = slackMessage(req.method.toUpperCase(), req.originalUrl, err, req.body.user?.id);
    sendMessageToSlack(errorMessage);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 * @route PUT /user/:toggle
 * @desc Push Alarm Toggle Change
 * @access Public
 */
const changeToggle = async (req: Request, res: Response) => {
  const userId = req.header("userId");
  const toggle: string = req.params.toggle;
  const userAlarmDto: UserAlarmDto = req.body;

  if (!userId) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }
  if (toggle !== "1" && toggle !== "0") {
    // toggle parameter 값은 1이나 0만 받음, 다른게 들어오면 404 처리
    return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
  }

  try {
    const result = await UserService.changeToggle(userId as string, toggle, userAlarmDto);
    if (result === null) {
      return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND_FCM));
    }

    return res.status(statusCode.OK).send(util.success(statusCode.OK, message.CHANGE_TOGGLE_SUCCESS));
  } catch (err) {
    console.log(err);
    const errorMessage: string = slackMessage(req.method.toUpperCase(), req.originalUrl, err, req.body.user?.id);
    sendMessageToSlack(errorMessage);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 * @router PUT /user/fcm-token
 * @desc Refresh User's fcm token
 * @access Public
 */
const updateFcmToken = async (req: Request, res: Response) => {
  const fcmTokenUpdateDto: FcmTokenUpdateDto = req.body;
  const userId = req.header("userId");

  try {
    const updatedToken = await UserService.updateFcmToken(userId as string, fcmTokenUpdateDto);

    if (updatedToken === null) {
      return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NULL_VALUE));
    }

    return res.status(statusCode.OK).send(util.success(statusCode.OK, message.UPDATE_FCM_TOKEN_SUCCESS));
  } catch (err) {
    console.log(err);
    const errorMessage: string = slackMessage(req.method.toUpperCase(), req.originalUrl, err, req.body.user?.id);
    sendMessageToSlack(errorMessage);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 * @router DELETE /user
 * @desc Delete User
 * @access Private
 */
const deleteUser = async (req: Request, res: Response) => {
  const userId = req.header("userId");

  try {
    await UserService.deleteUser(userId as string);
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.DELETE_USER_SUCCESS));
  } catch (err) {
    console.log(err);
    const errorMessage: string = slackMessage(req.method.toUpperCase(), req.originalUrl, err, req.body.user?.id);
    sendMessageToSlack(errorMessage);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  updateNickname,
  getUser,
  changeToggle,
  updateFcmToken,
  deleteUser,
};
