import { Router } from 'express';
import RecordController from '../controllers/RecordController';
import { body } from 'express-validator/check';

const router: Router = Router();

router.post('/', [body('title').notEmpty()], RecordController.createRecord);
router.get('/:recordId', RecordController.getRecord);
router.get('/', RecordController.getRecordList);
export default router;
