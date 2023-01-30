import { Request, Response } from "express";
import message from "../modules/responseMessage";
import { slackMessage } from "../modules/returnToSlackMessage";
import { sendMessageToSlack } from "../modules/slackAPI";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import VersionService from "../services/VersionService";

/**
 *  @route GET /version
 *  @desc Get App Version
 *  @access Public
 */
const getAppVersion = async (req: Request, res: Response) => {
  try {
    const data = await VersionService.getAppVersion();

    if (data === null) {
      res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_VERSION_SUCCESS, data));
  } catch (err) {
    console.log(err);
    const errorMessage: string = slackMessage(req.method.toUpperCase(), req.originalUrl, err, req.body.user?.id);
    sendMessageToSlack(errorMessage);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  getAppVersion,
};
