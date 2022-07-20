import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { NoticeBaseDto } from "../interfaces/notice/NoticeBaseDto";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import NoticeService from "../services/NoticeService";

/**
 * @route /notice
 * @desc POST notice time
 * @access Public
 */
const postNotice = async (req: Request, res: Response) => {
  const err = validationResult(req);
  const noticeBaseDto: NoticeBaseDto = req.body;
  const userId = req.header("userId");

  if (!err.isEmpty()) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.POST_NOTICE_FAIL));
  }

  if (!userId) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  try {
    const data = await NoticeService.postNotice(noticeBaseDto, userId as string);
    if (!data) {
      return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND_FCM));
    }

    res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.POST_NOTICE_SUCCESS, data));
  } catch (err) {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 * @route /notice/:noticeId
 * @desc PUT notice time (update)
 * @access Public
 */
const updateNotice = async (req: Request, res: Response) => {
  const err = validationResult(req);
  const noticeBaseDto: NoticeBaseDto = req.body;
  const { noticeId } = req.params;
  const userId = req.header("userId");

  if (!err.isEmpty()) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.UPDATE_NOTICE_FAIL));
  }

  if (!noticeId || !userId) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  try {
    const data = await NoticeService.updateNotice(noticeId, noticeBaseDto, userId as string);
    if (!data) {
      return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND_FCM));
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, message.UPDATE_NOTICE_SUCCESS));
  } catch (err) {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  postNotice,
  updateNotice,
};
