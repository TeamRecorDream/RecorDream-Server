import { Router } from "express";
import { body } from "express-validator";
import NoticeController from "../controllers/NoticeController";

const router: Router = Router();

router.post("/", [body("time").notEmpty()], NoticeController.postNotice);

export default router;
