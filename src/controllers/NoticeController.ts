import { Request, Response } from "express";
import { validationResult } from "express-validator";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import NoticeService from "../services/NoticeService";
import { sendMessageToSlack } from "../modules/slackAPI";
import { slackMessage } from "../modules/returnToSlackMessage";
import { NoticeOffDto } from "../interfaces/notice/NoticeOffDto";

/**
 * @route /notice
 * @desc PUT notice time (update)
 * @access Public
 */
const updateNotice = async (req: Request, res: Response) => {
  const err = validationResult(req);
  //const noticePostDto: NoticePostDto = req.body;
  const userId = req.header("userId");
  const { noticeId } = req.params;

  if (!err.isEmpty()) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.UPDATE_NOTICE_FAIL));
  }

  if (!userId) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  try {
    const data = await NoticeService.updateNotice(userId as string, noticeId);
    if (data === null) {
      return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NO_FCM));
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, message.UPDATE_NOTICE_SUCCESS));
  } catch (err) {
    console.log(err);
    const errorMessage: string = slackMessage(req.method.toUpperCase(), req.originalUrl, err, req.body.user?.id);
    sendMessageToSlack(errorMessage);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 * @route PATCH /notice
 * @desc Push Alarm Toggle OFF
 * @access Public
 */
const toggleOff = async (req: Request, res: Response) => {
  const noticeOffDto: NoticeOffDto = req.body;

  try {
    const result = await NoticeService.toggleOff(noticeOffDto);
    if (result === null) {
      return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NO_FCM));
    }

    return res.status(statusCode.OK).send(util.success(statusCode.OK, message.TOGGLE_OFF_SUCCESS));
  } catch (err) {
    console.log(err);
    const errorMessage: string = slackMessage(req.method.toUpperCase(), req.originalUrl, err, req.body.user?.id);
    sendMessageToSlack(errorMessage);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  updateNotice,
  toggleOff,
};
