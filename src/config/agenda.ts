import Agenda from "agenda";
import config from "../config";

const configureMongoDBObj = {
  db: {
    address: config.mongoURI,
  },
};

const agenda = new Agenda(configureMongoDBObj);

export default agenda;
