import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { RecordCreateDto } from "../interfaces/record/RecordCreateDto";
import message from "../modules/reponseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import RecordService from "../services/RecordService";
import dayjs from "dayjs";

/**
 * @route POST /record
 * @desc Create Record
 * @access Public
 */
const createRecord = async (req: Request, res: Response) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.CREATE_RECORD_FAIL));
  }
  req.body.date = dayjs(req.body.date).format("YYYY-MM-DD");
  const recordCreateDto: RecordCreateDto = req.body;

  try {
    const data = await RecordService.createRecord(recordCreateDto);

    res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_RECORD_SUCCESS, data));
  } catch (err) {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  createRecord,
};
