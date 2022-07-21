import { Request, Response } from "express";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { VoiceService } from "../services";
import { sendMessageToSlack } from "../modules/slackAPI";
import { slackMessage } from "../modules/returnToSlackMessage";

/**
 *  @route POST /voice
 *  @desc Upload Voice
 *  @access Public
 */
const uploadVoiceFileToS3 = async (req: Request, res: Response) => {
  try {
    const data = await VoiceService.createVoice();
    res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.UPLOAD_VOICE_SUCCESS, data));
  } catch (err) {
    console.log(err);
    const errorMessage: string = slackMessage(req.method.toUpperCase(), req.originalUrl, err, req.body.user?.id);
    sendMessageToSlack(errorMessage);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route GET /voice/:voiceId
 *  @desc Get Voice
 *  @access Public
 */
const getVoice = async (req: Request, res: Response) => {
  const { voiceId } = req.params;
  try {
    const data = await VoiceService.getVoice(voiceId);
    if (!data) {
      res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.PLAY_VOICE_SUCCESS, data));
  } catch (err) {
    console.log(err);
    const errorMessage: string = slackMessage(req.method.toUpperCase(), req.originalUrl, err, req.body.user?.id);
    sendMessageToSlack(errorMessage);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  uploadVoiceFileToS3,
  getVoice,
};
