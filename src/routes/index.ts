//router index file
import { Router } from "express";
import RecordRouter from "./RecordRouter";
import UserRouter from "./UserRouter";
import VoiceRouter from "./VoiceRouter";
import AuthRouter from "./AuthRouter";
import VersionRouter from "./VersionRouter";

const router: Router = Router();

router.use("/voice", VoiceRouter);
router.use("/user", UserRouter);
router.use("/record", RecordRouter);
router.use("/auth", AuthRouter);
router.use("/version", VersionRouter);

export default router;
