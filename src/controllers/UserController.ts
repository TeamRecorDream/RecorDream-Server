import { Request, Response } from "express";
import { UserNicknameUpdateDto } from "../interfaces/user/UserNicknameUpdateDto";
import { validationResult } from "express-validator";
import message from "../modules/reponseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import UserService from "../services/UserService";

/**
 * @route PUT /user/nickname
 * @desc Update User Nickname
 * @access Public
 */
const updateNickname = async (req: Request, res: Response): Promise<void> => {
  const err = validationResult(req);
  const userUpdateDto: UserNicknameUpdateDto = req.body;
  const userId = req.header("userId");

  try {
    if (!userId || !err.isEmpty()) {
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.UPDATE_NICKNAME_FAIL));
    }

    await UserService.updateNickname(userId as string, userUpdateDto);

    res.status(statusCode.OK).send(util.success(statusCode.OK, message.UPDATE_NICKNAME_SUCCESS));
  } catch (err) {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 * @route GET /user
 * @desc Get User
 * @access Public
 */
const getUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.header("userId");

  try {
    if (!userId) {
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }
    const data = await UserService.getUser(userId as string);

    res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_USER_SUCCESS, data));
  } catch (err) {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  updateNickname,
  getUser,
};
