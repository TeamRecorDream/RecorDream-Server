import dayjs from "dayjs";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { NoticeBaseDto } from "../interfaces/notice/NoticeBaseDto";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import NoticeService from "../services/NoticeService";
dayjs.locale("en");

/**
 * @route /notice
 * @desc POST notice time
 * @access Public
 */
const postNotice = async (req: Request, res: Response) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.POST_NOTICE_FAIL));
  }

  const noticeBaseDto: NoticeBaseDto = req.body;

  try {
    const data = await NoticeService.postNotice(noticeBaseDto);

    res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.POST_NOTICE_SUCCESS, data));
  } catch (err) {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  postNotice,
};
