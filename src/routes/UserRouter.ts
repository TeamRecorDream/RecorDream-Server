import { Router } from "express";
import { body } from "express-validator";
import { UserController } from "../controllers";

const router: Router = Router();

router.put("/nickname", [body("nickname").notEmpty().trim()], UserController.updateNickname);

export default router;
