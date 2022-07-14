import { Router } from 'express';
import RecordController from '../controllers/RecordController';
import { body } from 'express-validator/check';
import { check } from 'express-validator/check';

const router: Router = Router();

router.post('/', [body('title').notEmpty()], RecordController.createRecord);
router.get('/:recordId', RecordController.getRecord);
router.patch(
  '/:recordId',
  [check('title').if(body('title').exists()).notEmpty(), check('title').if(body('title').exists()).trim().notEmpty()],
  RecordController.updateRecord
); //title not empty 어떻게?
export default router;
