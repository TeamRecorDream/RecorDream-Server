import { Router } from "express";
import { VersionController } from "../controllers";

const router: Router = Router();

router.get("/", VersionController.getAppVersion);

export default router;
