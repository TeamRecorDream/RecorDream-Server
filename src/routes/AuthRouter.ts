import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router: Router = Router();

router.post("/login", AuthController.socailLogin);

export default router;
