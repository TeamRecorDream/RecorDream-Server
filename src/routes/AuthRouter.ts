import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router: Router = Router();

router.post("/login", AuthController.socailLogin);
router.post("/token", AuthController.reissueToken);

export default router;
