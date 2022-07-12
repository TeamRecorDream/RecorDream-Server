import { Router } from 'express';
import { VoiceController } from '../controllers';
import upload from '../config/multer';

const router: Router = Router();
router.post('/', upload.single('voice'), VoiceController.uploadVoiceFileToS3);
router.get('/:voiceId', VoiceController.getVoice);

export default router;
