import mongoose from "mongoose";
import config from "../config";
import * as admin from "firebase-admin";
import serviceAccount from "../config/firebase-admin.json";

const connectDB = async () => {
  let firebase;
  try {
    if (admin.apps.length === 0) {
      firebase = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });
      console.log("SDK 초기화 완료!");
    } else {
      firebase = admin.app();
      console.log("FCM 준비 완료!");
    }

    await mongoose.connect(config.mongoURI);

    mongoose.set("autoCreate", true);

    console.log("Mongoose Connected ...");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
