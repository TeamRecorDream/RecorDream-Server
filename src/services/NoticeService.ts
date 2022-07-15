import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { NoticeBaseDto } from "../interfaces/notice/NoticeBaseDto";
import Notice from "../models/Notice";

const postNotice = async (noticeBaseDto: NoticeBaseDto): Promise<PostBaseResponseDto> => {
  try {
    const notice = new Notice(noticeBaseDto);

    await notice.save();

    const data = {
      _id: notice._id,
    };

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  postNotice,
};
