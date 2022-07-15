import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { RecordCreateDto } from '../interfaces/record/RecordCreateDto';
import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import util from '../modules/util';
import RecordService from '../services/RecordService';
import dayjs from 'dayjs';

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

  req.body.date = dayjs(req.body.date).format('YYYY-MM-DD');
  const recordCreateDto: RecordCreateDto = req.body;

  try {
    const data = await RecordService.createRecord(recordCreateDto);

    res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_RECORD_SUCCESS, data));
  } catch (err) {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route GET /record/:recordId
 *  @desc Get Record
 *  @access Public
 */
const getRecord = async (req: Request, res: Response) => {
  const { recordId } = req.params;
  try {
    const data = await RecordService.getRecord(recordId);
    if (!data) {
      res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_RECORD_SUCCESS, data));
  } catch (err) {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route GET /record/:userId
 *  @desc Get RecordList
 *  @access Public
 */
const getRecordList = async(req: Request, res: Response) => {
  const userId = req.header('userId');

  try {
    if (!userId) {
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    const data = await RecordService.getRecordList(userId as string);
    if (!data) {
      res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_RECORD_SUCCESS, data));
  } catch (err) {
    console.log(err);
  }};

/*
 *  @route DELETE /record/:recordId
 *  @desc DELETE Record
 *  @access Public
 */
const deleteRecord = async (req: Request, res: Response) => {
  const { recordId } = req.params;
  try {
    const data = await RecordService.deleteRecord(recordId);
    if (data === false) {
      res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.DELETE_RECORD_SUCCESS));
  } catch (err) {
    console.log(err); //서버 내부에서 오류 발생.
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  createRecord,
  getRecord,
  getRecordList,
  deleteRecord,
};
