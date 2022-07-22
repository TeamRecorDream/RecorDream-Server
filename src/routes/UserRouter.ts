import { Router } from "express";
import { body } from "express-validator";
import { UserController } from "../controllers";

const router: Router = Router();

router.get("/:token", UserController.getUser);
router.put("/nickname", [body("nickname").notEmpty().isLength({ min: 1, max: 8 })], UserController.updateNickname);
router.put("/fcm-token", UserController.updateFcmToken);
router.put("/:toggle", UserController.changeToggle);

export default router;
