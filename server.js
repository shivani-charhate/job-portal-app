import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";

import connectDB from "./config/db.js";
import testRoute from "./routes/testRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoutes.js";
import jobRoute from "./routes/jobsRoute.js";
import errroMiddelware from "./middelwares/authMiddelware.js";

// env config
dotenv.config({ path: "./config/.env" });

// mngodb connection
connectDB();

// rest object
const app = express();

// middelewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/api/v1/test", testRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);

// custome middelware
app.use(errroMiddelware);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode on Port no ${port}`
  );
});
