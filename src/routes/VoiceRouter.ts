import { Router } from "express";
import { VoiceController } from "../controllers";
import upload from "../config/multer";
import auth from "../middleware/auth";

const router: Router = Router();
router.post("/", upload.single("file"), VoiceController.uploadVoiceFileToS3);
router.patch("/:voiceId", upload.single("file"), VoiceController.uploadVoiceFileToS3AndUpdate);
router.get("/:voiceId", VoiceController.getVoice);

export default router;
