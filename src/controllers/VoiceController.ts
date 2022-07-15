import { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { VoiceService } from '../services';

/**
 *  @route POST /voice
 *  @desc Upload Voice
 *  @access Public
 */
const uploadVoiceFileToS3 = async (req: Request, res: Response) => {
  // if (!req.file)
  //   return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.UPLOAD_VOICE_FORM_FAIL));

  const voice: Express.MulterS3.File = req.file as Express.MulterS3.File; //req.file은 기본 Express.Multer.File 타입으로 추론되어서 s3버전으로 타입 단언 필요.
  const { originalname, location } = voice;

  try {
    const data = await VoiceService.createVoice(location, originalname);
    res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.UPLOAD_VOICE_SUCCESS, data));
  } catch (err) {
    console.log(err);
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
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  uploadVoiceFileToS3,
  getVoice,
};
