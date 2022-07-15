import { Router } from 'express';
import RecordController from '../controllers/RecordController';
import { body, validationResult } from 'express-validator/check';
import { check } from 'express-validator/check';

const router: Router = Router();

//title null 안됨, 공백만 안됨, 공백제외글자수 25까지 가능
router.post(
  '/',
  [body('title').exists().notEmpty(), body('title').trim().isLength({ min: 1, max: 25 })],
  RecordController.createRecord
);
router.get('/:recordId', RecordController.getRecord);
router.patch(
  '/:recordId',
  [
    check('title').if(
      body('title')
        .exists()
        .custom((value) => {
          if (value.toString().replace(/(\s*)/g, '').length > 25 || value.toString().replace(/(\s*)/g, '').length < 1) {
            console.log(value.toString().replace(/(\s*)/g, '').length);
            throw new Error('제목 오류');
          }
          console.log(value.toString().replace(/(\s*)/g, '').length);
          return true;
        })
    ),
  ],
  RecordController.updateRecord
); //title not empty 어떻게?
router.delete('/:recordId', RecordController.deleteRecord);

export default router;
