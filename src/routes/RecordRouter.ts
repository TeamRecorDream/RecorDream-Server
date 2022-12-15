import { Router } from "express";
import RecordController from "../controllers/RecordController";
import { body } from "express-validator";
import auth from "../middleware/auth";

const router: Router = Router();

// title null 안됨, 공백만 안됨, 공백 제외 글자수 25까지 가능. voice와 writer는 수정불가
router.post(
  "/",
  auth,
  [
    body("date").exists().notEmpty(),
    body("title").exists(),
    body("title")
      .custom((title) => {
        if (title.toString().replace(/(\s*)/g, "").length > 25 || title.toString().replace(/(\s*)/g, "").length < 1) {
          return false;
        }
        return true;
      })
      .withMessage("제목 오류"),
  ],
  RecordController.createRecord
);
router.get("/:recordId", auth, RecordController.getRecord);
router.get("/", auth, RecordController.getRecordHome);
router.patch(
  "/:recordId",
  auth,
  [
    body("date").exists().notEmpty(),
    body("title").exists(),
    body("title")
      .custom((title) => {
        if (title.toString().replace(/(\s*)/g, "").length > 25 || title.toString().replace(/(\s*)/g, "").length < 1) {
          return false;
        }
        return true;
      })
      .withMessage("제목 오류"),
    body("voice").not().exists(),
  ],
  RecordController.updateRecord
);
router.delete("/:recordId", auth, RecordController.deleteRecord);
router.get("/storage/list", auth, RecordController.getRecordStorage);
router.get("/storage/search", auth, RecordController.getRecordsBySearch);

export default router;
