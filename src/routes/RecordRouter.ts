import { Router } from "express";
import RecordController from "../controllers/RecordController";
import { body } from "express-validator/check";

const router: Router = Router();

router.post("/", [
    body("title").notEmpty()
], RecordController.createRecord);

router.get('/:recordId', RecordController.getRecord);

router.put('/:recordId', [
    body("title").notEmpty()
], RecordController.updateRecord);

router.delete('/:recordId', RecordController.deleteRecord);


export default router;
