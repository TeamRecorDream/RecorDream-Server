import { Router } from "express";
import { body } from "express-validator";
import { UserController } from "../controllers";

const router: Router = Router();
router.get("/", [body("fcm_token").notEmpty()], UserController.getUser);
router.put("/nickname", [body("nickname").trim().notEmpty()], UserController.updateNickname);
router.put("/fcm-token", UserController.updateFcmToken);
router.put("/:toggle", UserController.changeToggle);

export default router;
