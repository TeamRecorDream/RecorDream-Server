import { Router } from 'express';
import RecordController from '../controllers/RecordController';
import { body, validationResult } from 'express-validator/check';
import { check } from 'express-validator/check';

const router: Router = Router();

//title null 안됨, 공백만 안됨, 공백 제외 글자수 25까지 가능. voice와 writer는 수정불가
router.post(
  '/',
  [
    body('title').exists(),
    body('title')
      .custom((title) => {
        if (title.toString().replace(/(\s*)/g, '').length > 25 || title.toString().replace(/(\s*)/g, '').length < 1) {
          return false;
        }
        return true;
      })
      .withMessage('제목 오류'),
  ],
  RecordController.createRecord
);
router.get('/:recordId', RecordController.getRecord);
router.patch(
  '/:recordId',
  [
    check('title')
      .if(body('title').exists())
      .custom((title) => {
        if (title.toString().replace(/(\s*)/g, '').length > 25 || title.toString().replace(/(\s*)/g, '').length < 1) {
          return false;
        }
        return true;
      })
      .withMessage('제목 오류'),
    body('voice').not().exists(),
    body('writer').not().exists(),
  ],
  RecordController.updateRecord
);
router.delete('/:recordId', RecordController.deleteRecord);

export default router;
