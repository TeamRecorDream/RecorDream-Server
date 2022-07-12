//router index file
import { Router } from "express";
import RecordRouter from "./RecordRouter";
import UserRouter from "./UserRouter";

const router: Router = Router();

router.use("/user", UserRouter);
router.use("/record", RecordRouter);
export default router;
