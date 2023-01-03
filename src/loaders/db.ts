import mongoose from "mongoose";
import config from "../config";
import * as admin from "firebase-admin";
import serviceAccount from "../config/firebase-admin.json";
import User from "../models/User";
import agenda from "./agenda";
import pushMessage from "../modules/pushMessage";

const connectDB = async () => {
  try {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });
    } else {
      admin.app();
      console.log("FCM 준비 완료!");
    }

    await mongoose.connect(config.mongoURI);

    mongoose.set("autoCreate", true);

    // 푸시알림
    const user = await User.find({ isActive: true });

    for (let i = 0; i < user.length; i++) {
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
        tokens: user[i].fcmTokens,
      };

      agenda.define("push_" + `${user[i]._id}`, async (job: any, done: any) => {
        admin
          .messaging()
          .sendMulticast(alarms)
          .then(function (res) {
            console.log("Sent message result: ", res);
          });
        job.repeatEvery("24 hours").save();
        done();
      });
      agenda.start();
    }

    const jobs = await agenda.jobs({ lockedAt: { $exists: true, $ne: null } });

    if (jobs.length > 0) {
      for (let i = 0; i < jobs.length; i++) {
        const job = jobs[i];
        (job.attrs.lockedAt = null), await job.save();
      }
    }

    const graceful = () => {
      agenda.stop();
      process.exit(0);
    };

    process.on("SIGTERM", graceful);
    process.on("SIGINT", graceful);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
