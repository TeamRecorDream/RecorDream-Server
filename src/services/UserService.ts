import { FcmTokenUpdateDto } from "../interfaces/user/FcmTokenUpdateDto";
import { UserNicknameUpdateDto } from "../interfaces/user/UserNicknameUpdateDto";
import { UserNoticeBaseDto } from "../interfaces/user/UserNoticeBaseDto";
import User from "../models/User";
import pushMessage from "../modules/pushMessage";
import * as admin from "firebase-admin";
import Agenda from "agenda";
import config from "../config";
import exceptionMessage from "../modules/exceptionMessage";

// agenda setting
const agenda = new Agenda({
  db: { address: config.mongoURI },
});

const updateNickname = async (userId: string, userNicknameUpdateDto: UserNicknameUpdateDto) => {
  try {
    const updatedNickname = {
      nickname: userNicknameUpdateDto.nickname,
    };

    const user = await User.findByIdAndUpdate(userId, updatedNickname);

    if (!user) {
      return null;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getUser = async (userId: string) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return null;
    }

    const result = {
      nickname: user.nickname,
      email: user.email,
      isActive: user.isActive,
      time: user.time,
    };
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// 유저의 fcmToken을 하나하나 업데이트
const updateFcmToken = async (userId: string, fcmTokenUpdateDto: FcmTokenUpdateDto) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return null;
    }

    const tokens = {
      originToken: fcmTokenUpdateDto.originToken,
      newToken: fcmTokenUpdateDto.newToken,
    };

    // 입력받은 fcmToken이 DB에 없을 경우
    if (!user.fcmTokens.includes(tokens.originToken)) {
      return exceptionMessage.NOT_FOUND_FCM;
    }

    await User.updateOne({ fcmTokens: tokens.originToken }, { $set: { "fcmTokens.$": tokens.newToken } }).exec();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteUser = async (userId: string) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return null;
    }

    await User.deleteOne({ _id: userId });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const saveNotice = async (noticeBaseDto: UserNoticeBaseDto) => {
  try {
    const updatedTime = {
      time: noticeBaseDto.time,
    };

    const user = await User.findById(noticeBaseDto.userId);
    if (!user) {
      return null;
    }
    if (user.isActive === false) {
      return exceptionMessage.CANT_SET_TIME;
    }

    const data = await User.findByIdAndUpdate(noticeBaseDto.userId, updatedTime, { new: true });
    if (!data) {
      return null;
    }

    const time = data.time;
    if (!time) {
      return null;
    }
    const timeSplit = time.split(/ /);
    const ampm = timeSplit[0];
    const pushTime = timeSplit[1];

    const allJobs = await agenda.jobs({ "data.userId": data._id });

    // 첫 시간 저장
    if (allJobs.length === 0) {
      console.log("매일 " + pushTime + " " + `${ampm}` + "에 푸시알림을 보냅니다.");

      agenda.schedule("today at " + pushTime + ampm + "", "pushAlarm", { userId: data._id });
      agenda.start();
    }
    // 시간이 이미 설정됨을 의미
    if (allJobs.length > 0) {
      console.log("시간이 수정되어 리스케줄링합니다.");

      await agenda.cancel({ "data.userId": data._id });
      agenda.schedule("today at " + pushTime + ampm + "", "pushAlarm", { userId: data._id });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// 푸시알림 여부 변경
const toggleChange = async (userId: string) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return null;
    }

    if (user.isActive === true) {
      user.time = null;
      user.isActive = false;

      await agenda.cancel({ "data.userId": user._id }); // 토글 off 시 푸시알림 취소
    }

    // 토글이 on이면 푸시알림 보내기
    else {
      user.isActive = true;

      // for fcmToken refreshness
      if (user.fcmTokens.length === 0) {
        return exceptionMessage.SEND_ALARM_FAIL;
      }

      const alarms = {
        android: {
          data: {
            title: pushMessage.title,
            body: pushMessage.body,
          },
        },
        apns: {
          payload: {
            aps: {
              contentAvailable: true,
              alert: {
                title: pushMessage.title,
                body: pushMessage.body,
              },
            },
          },
        },
        tokens: user.fcmTokens,
      };

      // 실행할 작업 정의
      agenda.define("pushAlarm", async (job, done) => {
        admin
          .messaging()
          .sendMulticast(alarms)
          .then(function (res: any) {
            if (res.failureCount > 0) {
              const failedTokens: string[] = [];
              res.responses.forEach((resp: any, idx: any) => {
                if (!resp.success) {
                  failedTokens.push(user.fcmTokens[idx]);
                }
              });
              console.log("List of tokens that caused failures: " + failedTokens);
            }
            console.log("Sent message result: ", res);
          });
        job.repeatEvery("24 hours");
        job.save();
        done();
      });
    }

    await User.updateOne({ _id: userId }, { $set: { time: user.time, isActive: user.isActive } }).exec();

    const data = {
      isActive: user.isActive,
    };

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  updateNickname,
  getUser,
  updateFcmToken,
  deleteUser,
  saveNotice,
  toggleChange,
};
