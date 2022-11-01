import { Router } from "express";
import { body } from "express-validator";
import NoticeController from "../controllers/NoticeController";
import auth from "../middleware/auth";

const router: Router = Router();

router.post("/", auth, [body("time").trim().notEmpty()], NoticeController.postNotice);
router.put("/:noticeId", [body("time").trim().notEmpty(), body("fcm_token").notEmpty()], NoticeController.updateNotice);
router.patch("/", auth, NoticeController.toggleOff);

export default router;
