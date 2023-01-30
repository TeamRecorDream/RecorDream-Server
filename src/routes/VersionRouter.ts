import { Router } from "express";
import { VersionController } from "../controllers";
import auth from "../middleware/auth";

const router: Router = Router();

router.get("/", auth, VersionController.getAppVersion);

export default router;
