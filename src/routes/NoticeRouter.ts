import { Router } from "express";
import { body } from "express-validator";
import NoticeController from "../controllers/NoticeController";

const router: Router = Router();

router.post("/", [body("time").trim().notEmpty()], NoticeController.postNotice);
router.put("/:noticeId", [body("time").trim().notEmpty()], NoticeController.updateNotice);

export default router;
