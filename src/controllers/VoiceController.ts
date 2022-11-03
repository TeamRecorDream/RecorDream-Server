import { Request, Response } from "express";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { VoiceService } from "../services";
import { sendMessageToSlack } from "../modules/slackAPI";
import { slackMessage } from "../modules/returnToSlackMessage";
import { VoiceUploadDto } from "../interfaces/voice/VoiceUploadDto";

/**
 *  @route POST /voice
 *  @desc Upload Voice
 *  @access Public
 */
const uploadVoiceFileToS3 = async (req: Request, res: Response) => {
  if (!req.file)
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.UPLOAD_VOICE_FORM_FAIL));

  const voice: Express.MulterS3.File = req.file as Express.MulterS3.File; //req.file은 기본 Express.Multer.File 타입으로 추론되어서 s3버전으로 타입 단언 필요.
  const { originalname, location } = voice;
  const userId = req.header("userId");

  if (!userId) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.UPLOAD_VOICE_FORM_FAIL));

  try {
    const voiceUploadDto: VoiceUploadDto = { url: location, fileName: originalname, recorder: userId };
    const data = await VoiceService.createVoice(voiceUploadDto);
    res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.UPLOAD_VOICE_SUCCESS, data));
  } catch (err) {
    console.log(err);
    const errorMessage: string = slackMessage(req.method.toUpperCase(), req.originalUrl, err, req.body.user?.id);
    sendMessageToSlack(errorMessage);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route PATCH /voice/:voiceId
 *  @desc Upload New Voice File And Update Voice object
 *  @access Public
 */
const uploadVoiceFileToS3AndUpdate = async (req: Request, res: Response) => {
  const { voiceId } = req.params;
  if (!req.file) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.UPDATE_VOICE_FAIL));

  const voice: Express.MulterS3.File = req.file as Express.MulterS3.File; //req.file은 기본 Express.Multer.File 타입으로 추론되어서 s3버전으로 타입 단언 필요.
  const { originalname, location } = voice;
  const userId = req.header("userId");

  if (!userId) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.UPDATE_VOICE_FAIL));

  try {
    const voiceUploadDto: VoiceUploadDto = { url: location, fileName: originalname, recorder: userId };
    console.log(location);
    console.log(originalname);
    const data = await VoiceService.updateVoice(userId, voiceId, voiceUploadDto);
    if (!data) {
      res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.UPDATE_VOICE_SUCCESS, data));
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
  const userId = req.header("userId");

  if (!userId) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.UPLOAD_VOICE_FORM_FAIL));

  try {
    const data = await VoiceService.getVoice(userId, voiceId);
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
  uploadVoiceFileToS3AndUpdate,
  getVoice,
};
