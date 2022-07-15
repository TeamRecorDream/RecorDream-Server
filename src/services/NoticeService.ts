import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { NoticeCreateDto } from "../interfaces/notice/NoticeCreateDto";
import Notice from "../models/Notice";

const postNotice = async (noticeCreateDto: NoticeCreateDto): Promise<PostBaseResponseDto> => {
  try {
    const notice = new Notice(noticeCreateDto);

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
