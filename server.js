// Api doc packages
import swaggerUI, { serve } from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";

// security packages
import helmet from "helmet";
import xss from "xss-clean";
// mongoDb security package
import mongoSantize from "express-mongo-sanitize";
// import fs from "fs";

import connectDB from "./config/db.js";
import testRoute from "./routes/testRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoutes.js";
import jobRoute from "./routes/jobsRoute.js";
import errroMiddelware from "./middelwares/authMiddelware.js";
import jobsModel from "./models/jobsModel.js";

// env config
dotenv.config({ path: "./config/.env" });

// mngodb connection
connectDB();

// add swagger api config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Node Expressjs Job Portal Application",
      version: "1.0.0",
    },
    servers: [
      {
        // url: "http://localhost:8080",
        // hosting url
        url:"https://job-portal-app-qy4q.onrender.com/"
      },
    ],
  },
  // to access all route
  apis: ["./routes/*.js"],
};
const spec = swaggerJsDoc(options);

// rest object
const app = express();

// middelewares
app.use(helmet());
app.use(xss());
app.use(mongoSantize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/api/v1/test", testRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);

// route for swagger
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(spec));

// external file import
// const data = JSON.parse(fs.readFileSync("./job-data.json", "utf-8"));
// // console.log(data);
// const importData = async () => {
//   try {
//     await jobsModel.create(data);
//     console.log("data successfully imported");
//     // to exit the process
//     process.exit();
//   } catch (error) {
//     console.log("error", error);
//   }
// };
// importData();

// custome middelware
app.use(errroMiddelware);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode on Port no ${port}`
  );
});
