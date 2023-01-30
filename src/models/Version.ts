import mongoose from "mongoose";
import { VersionInfo } from "../interfaces/version/VersionInfo";

const VersionSchema = new mongoose.Schema({
  iOS_force_app_version: {
    type: String,
  },
  iOS_app_version: {
    type: String,
  },
  android_force_app_version: {
    type: String,
  },
  android_app_version: {
    type: String,
  },
});

export default mongoose.model<VersionInfo & mongoose.Document>("Version", VersionSchema);
