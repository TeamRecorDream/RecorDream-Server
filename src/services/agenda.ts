import agenda from "../config/agenda";

// list the different jobs availale throughout your app
// if you are adding the job types dynamically and saving them in the database you will get it here
const jobTypes = ["UserService"];

// loop through the services folder and pass in the agenda instance
jobTypes.forEach((type) => {
  // the type name should match the file name in the services folder
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("./services/" + type)(agenda);
});

if (jobTypes.length) {
  // if there are jobs in the jobsTypes array set up
  agenda.on("ready", async () => await agenda.start());
}

const graceful = () => {
  agenda.stop();
  process.exit(0);
};

process.on("SIGTERM", graceful);
process.on("SIGINT", graceful);

module.exports = agenda;
