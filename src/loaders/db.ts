import mongoose from "mongoose";
import config from "../config";
import * as admin from "firebase-admin";
import serviceAccount from "../config/firebase-admin.json";
import User from "../models/User";
import agenda from "./agenda";

const connectDB = async () => {
  let firebase;
  try {
    if (admin.apps.length === 0) {
      firebase = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });
    } else {
      firebase = admin.app();
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
            title: "test recordream",
            body: "테스트입니다.",
          },
        },
        apns: {
          payload: {
            aps: {
              contentAvailable: true,
              alert: {
                title: "test recordream",
                body: "테스트입니다.",
              },
            },
          },
        },
        tokens: user[i].fcmTokens,
      };

      agenda.define("push" + `${user[i]._id}`, async (job: any, done: any) => {
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
