import { Router } from "express";
import { VoiceController } from "../controllers";
import upload from "../config/multer";
import auth from "../middleware/auth";

const router: Router = Router();
router.post("/", auth, upload.single("file"), VoiceController.uploadVoiceFileToS3);
router.patch("/:voiceId", auth, upload.single("file"), VoiceController.uploadVoiceFileToS3AndUpdate);
router.get("/:voiceId", auth, VoiceController.getVoice);

export default router;
