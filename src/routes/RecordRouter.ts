import { Router } from "express";
import RecordController from "../controllers/RecordController";
import { body } from "express-validator/check";

const router: Router = Router();

router.post("/", [body("title").notEmpty()], RecordController.createRecord);

export default router;
