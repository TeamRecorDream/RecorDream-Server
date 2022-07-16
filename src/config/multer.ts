import multer from "multer";
import multerS3 from "multer-s3";
import config from ".";
import s3 from "./s3Config";

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.bucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE, //mimetype은 자동으로 설정.
    acl: "public-read", //Access control for the file.
    key: function (req: Express.Request, file: Express.MulterS3.File, cb) {
      cb(null, `${Date.now()}_${file.originalname}`); //key => 파일 이름 정의. 버킷내에서 이름 겹치면 동일 파일로 인식해서 보통 고유하게 만듦(시간이용).
    },
  }),
});

export default upload;
