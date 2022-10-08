import { Router } from "express";
import AuthController from "../controllers/AuthController";
import auth from "../middleware/auth";

const router: Router = Router();

router.post("/login", AuthController.socailLogin);
router.post("/token", AuthController.reissueToken);
router.patch("/logout", auth, AuthController.socialLogout);

export default router;
