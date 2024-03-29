import { Router } from "express";
import { body } from "express-validator";
import { UserController } from "../controllers";
import auth from "../middleware/auth";

const router: Router = Router();

router.get("/", auth, UserController.getUser);
router.put("/nickname", auth, [body("nickname").isLength({ min: 1, max: 8 })], UserController.updateNickname);
router.put("/fcm-token", auth, UserController.updateFcmToken);
router.delete("/", auth, UserController.deleteUser);
router.post("/notice", auth, [body("time").matches(/^[A-Z][A-Z]\s[0-9][0-9]:[0-9][0-9]$/)], UserController.saveNotice);
router.patch("/toggle", auth, UserController.toggleChange);

export default router;
