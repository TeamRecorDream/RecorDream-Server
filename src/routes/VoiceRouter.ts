import { Router } from 'express';
import { VoiceController } from '../controllers';
import upload from '../config/multer';
import { body } from 'express-validator/check';

const router: Router = Router();
//form-data 중 'voice' 필드
router.post('/', upload.single('voice'), VoiceController.uploadVoiceFileToS3);
router.get('/:voiceId', VoiceController.getVoice);

export default router;
