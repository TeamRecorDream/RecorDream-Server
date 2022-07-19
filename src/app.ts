import express, { Request, Response, NextFunction } from "express";
const app = express();
import connectDB from "./loaders/db";
import routes from "./routes";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes); //라우터

// error handler
interface ErrorType {
  message: string;
  status: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (err: ErrorType, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
