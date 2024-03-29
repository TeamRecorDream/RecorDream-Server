import { Request, Response } from "express";
import { UserNicknameUpdateDto } from "../interfaces/user/UserNicknameUpdateDto";
import { validationResult } from "express-validator";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import UserService from "../services/UserService";
import { FcmTokenUpdateDto } from "../interfaces/user/FcmTokenUpdateDto";
import { sendMessageToSlack } from "../modules/slackAPI";
import { slackMessage } from "../modules/returnToSlackMessage";
import { UserNoticeBaseDto } from "../interfaces/user/UserNoticeBaseDto";
import exceptionMessage from "../modules/exceptionMessage";

/**
 * @route PUT /user/nickname
 * @desc Update User Nickname
 * @access Public
 */
const updateNickname = async (req: Request, res: Response) => {
  const err = validationResult(req);
  const userNicknameUpdateDto: UserNicknameUpdateDto = req.body;
  const userId = req.body.user.id;

  try {
    const data = await UserService.updateNickname(userId, userNicknameUpdateDto);

    if (data === null) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.UPDATE_NICKNAME_FAIL));
    }

    if (!err.isEmpty()) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NICKNAME_RULE_VIOLATE));
    }

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
  const userId = req.body.user.id;

  try {
    const data = await UserService.getUser(userId);

    if (data === null) {
      return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_USER_SUCCESS, data));
  } catch (err) {
    console.log(err);
    const errorMessage: string = slackMessage(req.method.toUpperCase(), req.originalUrl, err, req.body.user?.id);
    sendMessageToSlack(errorMessage);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 * @router PUT /user/fcm-token
 * @desc Refresh User's fcmToken
 * @access Public
 */
const updateFcmToken = async (req: Request, res: Response) => {
  const fcmTokenUpdateDto: FcmTokenUpdateDto = req.body;
  const userId = req.body.user.id;

  try {
    const data = await UserService.updateFcmToken(userId, fcmTokenUpdateDto);

    if (data === null) {
      return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }
    if (data === exceptionMessage.NOT_FOUND_FCM) {
      return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND_FCM));
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, message.UPDATE_FCM_TOKEN_SUCCESS));
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
  const userId = req.body.user.id;

  try {
    await UserService.deleteUser(userId);

    res.status(statusCode.OK).send(util.success(statusCode.OK, message.DELETE_USER_SUCCESS));
  } catch (err) {
    console.log(err);
    const errorMessage: string = slackMessage(req.method.toUpperCase(), req.originalUrl, err, req.body.user?.id);
    sendMessageToSlack(errorMessage);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 * @route POST /user/notice
 * @desc Save notice time
 * @access Public
 */
const saveNotice = async (req: Request, res: Response) => {
  const err = validationResult(req);
  const userId = req.body.user.id;
  const time = req.body.time;
  const noticeBaseDto: UserNoticeBaseDto = {
    userId,
    time,
  };

  try {
    if (!err.isEmpty()) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.SAVE_NOTICE_FAIL));
    }

    const data = await UserService.saveNotice(noticeBaseDto);
    if (data === null) {
      return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }
    if (data === exceptionMessage.CANT_SET_TIME) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.CANT_SET_TIME));
    }
    if (data === exceptionMessage.SEND_ALARM_FAIL) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.SEND_ALARM_FAIL));
    }

    res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.SAVE_NOTICE_SUCCESS));
  } catch (err) {
    console.log(err);
    const errorMessage: string = slackMessage(req.method.toUpperCase(), req.originalUrl, err, req.body.user?.id);
    sendMessageToSlack(errorMessage);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 * @route PATCH /user/toggle
 * @desc PushAlarm Toggle Change
 * @access Public
 */
const toggleChange = async (req: Request, res: Response) => {
  const userId = req.body.user.id;
  const isActive = req.body.isActive;

  try {
    const data = await UserService.toggleChange(userId, isActive);

    if (data === null) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.TOGGLE_CHANGE_FAIL));
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, message.TOGGLE_CHANGE_SUCCESS, data));
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
  updateFcmToken,
  deleteUser,
  saveNotice,
  toggleChange,
};
