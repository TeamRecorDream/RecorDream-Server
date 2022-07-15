import dayjs from "dayjs";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { NoticeCreateDto } from "../interfaces/notice/NoticeCreateDto";
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

  req.body.time = dayjs().format("A hh:mm"); // mongoDB에 지정한 형식대로 넣으려고 추가
  const noticecreateDto: NoticeCreateDto = req.body;

  try {
    const data = await NoticeService.postNotice(noticecreateDto);

    res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.POST_NOTICE_SUCCESS, data));
  } catch (err) {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  postNotice,
};
