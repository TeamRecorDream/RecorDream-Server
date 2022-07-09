import { Request, Response } from "express";
import { UserUpdateDto } from "../interfaces/user/UserUpdateDto";
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
  const userUpdateDto: UserUpdateDto = req.body;
  const userId = req.header("userId");

  try {
    if (!userId || !err.isEmpty()) {
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.UPDATE_NICKNAME_FAIL));
    }

    await UserService.updateNickname(userId as string, userUpdateDto);

    res.status(statusCode.OK).send(util.success(statusCode.OK, "닉네임 수정 성공"));
  } catch (err) {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  updateNickname,
};
