import Agenda from "agenda";
import config from "../config";

const configureMongoDBObj = {
  db: {
    address: config.mongoURI,
  },
};

// test1

const agenda = new Agenda(configureMongoDBObj);

export default agenda;
