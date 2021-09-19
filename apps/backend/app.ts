import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import driversRouter from "./routes/v1/drivers";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/drivers", driversRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
