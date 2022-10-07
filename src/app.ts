import express, { Request, Response, NextFunction } from "express";
const app = express();
import connectDB from "./loaders/db";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

connectDB();

const swaggerSpec = YAML.load(path.join(__dirname, "../../build/swagger.yaml"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes); //라우터

// error handler
interface ErrorType {
  message: string;
  status: number;
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (err: ErrorType, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
