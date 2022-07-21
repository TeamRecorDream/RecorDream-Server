import axios from "axios";
import config from "../config";

export const sendMessageToSlack = async (message: string): Promise<void> => {
  try {
    await axios.post(config.webhookURL, { text: message });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
