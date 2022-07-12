import { Router } from "express";
import { body } from "express-validator";
import { UserController } from "../controllers";

const router: Router = Router();

router.get("/", UserController.getUser);
router.put("/nickname", [body("nickname").notEmpty().trim()], UserController.updateNickname);

export default router;
