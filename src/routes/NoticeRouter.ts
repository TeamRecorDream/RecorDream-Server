import { Router } from "express";
import { body } from "express-validator";
import NoticeController from "../controllers/NoticeController";

const router: Router = Router();

router.post("/", [body("time").notEmpty().trim()], NoticeController.postNotice);
router.put("/:noticeId", [body("time").notEmpty().trim()], NoticeController.updateNotice);

export default router;
