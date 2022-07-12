//router index file
import { Router } from 'express';
import VoiceRouter from './VoiceRouter';

const router: Router = Router();

router.use('/voice', VoiceRouter);

export default router;
