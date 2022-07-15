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
    } else {
      firebase = admin.app();
    }

    await mongoose.connect(config.mongoURI);

    mongoose.set("autoCreate", true);

    console.log("Mongoose Connected ...");
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
