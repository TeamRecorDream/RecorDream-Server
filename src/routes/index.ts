//router index file
import { Router } from "express";
import RecordRouter from "./RecordRouter";
import UserRouter from "./UserRouter";
import VoiceRouter from './VoiceRouter';

const router: Router = Router();

router.use('/voice', VoiceRouter);
router.use("/user", UserRouter);
router.use("/record", RecordRouter);
export default router;
