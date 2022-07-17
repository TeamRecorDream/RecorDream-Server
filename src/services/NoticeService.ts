import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { NoticeBaseDto } from "../interfaces/notice/NoticeBaseDto";
import Notice from "../models/Notice";
import * as admin from "firebase-admin";
import schedule from "node-schedule";

const postNotice = async (noticeBaseDto: NoticeBaseDto): Promise<PostBaseResponseDto> => {
  try {
    const notice = new Notice(noticeBaseDto);

    await notice.save();

    const data = {
      _id: notice._id,
    };

    const push_time = notice.time;
    let is_day = true; // AM, PM 판별

    const parts = push_time.split(/:| /);

    const daynight: string[] = []; // for AM, PM
    const split_time: number[] = []; // for 시간, 분

    daynight.push(parts[0]);

    for (let i = 0; i < 2; i++) {
      split_time.push(parseInt(parts[i + 1]));
    }
    let hour = split_time[0];
    const min = split_time[1];

    if (daynight[0] == "AM" || daynight[0] == "am") {
      is_day = true;
      console.log("낮이에요!");
    }
    if (daynight[0] == "PM" || daynight[0] == "pm") {
      is_day = false;
      console.log("밤이에요!");
    }

    if ((is_day === false && hour !== 12) || (is_day === true && hour == 12)) hour += 12; // 오후

    // 푸시알림 보내기
    const tokens = "";

    const alarms = {
      android: {
        data: {
          title: "Recordream",
          body: "방금 꾼 꿈, 잊어버리기 전에 기록해볼까요?",
        },
      },
      apns: {
        payload: {
          aps: {
            contentAvailable: true,
            alert: {
              title: "Recordream",
              body: "방금 꾼 꿈, 잊어버리기 전에 기록해볼까요?",
            },
          },
        },
      },
      token: tokens,
    };

    console.log(tokens);

    // 메시지 보내기
    admin
      .messaging()
      .send(alarms)
      .then(function (response: any) {
        schedule.scheduleJob({ hour: hour, minute: min }, function () {
          console.log("방금 꾼 꿈, 잊어버리기 전에 기록해볼까요?");
        });
        console.log("Successfully sent message: ", response);
      })
      .catch(function (err) {
        console.log("Error Sending message!!! : ", err);
      });

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

    const notice: NoticeBaseDto | null = await Notice.findByIdAndUpdate(noticeId, updatedTime).exec();

    if (notice !== null) {
      notice.is_changed = true;
      console.log(notice.is_changed);
    }

    const push_time = updatedTime.time;
    let is_day = true; // AM, PM 판별

    const parts = push_time.split(/:| /);

    const daynight: string[] = []; // for AM, PM
    const split_time: number[] = []; // for 시간, 분

    daynight.push(parts[0]);

    for (let i = 0; i < 2; i++) {
      split_time.push(parseInt(parts[i + 1]));
    }
    let hour = split_time[0];
    const min = split_time[1];

    if (daynight[0] == "AM" || daynight[0] == "am") {
      is_day = true;
      console.log("낮이에요!");
    }
    if (daynight[0] == "PM" || daynight[0] == "pm") {
      is_day = false;
      console.log("밤이에요!");
    }

    if ((is_day === false && hour !== 12) || (is_day === true && hour == 12)) hour += 12; // 오후라는 소리

    schedule.scheduleJob({ hour: hour, minute: min }, function () {
      console.log("방금 꾼 꿈, 잊어버리기 전에 기록해볼까요?");
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  postNotice,
  updateNotice,
};
