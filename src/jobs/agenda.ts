import config from "../config";
import Agenda from "agenda";

// mongoDB와 연결
const agenda = new Agenda({
  db: { address: config.mongoURI },
  name: "Push Alarm",
  processEvery: "20 seconds",
});

export default agenda;
