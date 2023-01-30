import Version from "../models/Version";

const getAppVersion = async () => {
  try {
    const result = await Version.findOne({}, { _id: 0 });

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  getAppVersion,
};
