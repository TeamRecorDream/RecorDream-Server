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

const updateNotice = async (noticeId: string, noticeBaseDto: NoticeBaseDto) => {
  try {
    const updatedTime = {
      time: noticeBaseDto.time,
    };

    await Notice.findByIdAndUpdate(noticeId, updatedTime);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  postNotice,
  updateNotice,
};
