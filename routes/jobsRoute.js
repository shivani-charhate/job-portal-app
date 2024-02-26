import express, { application } from "express";
import {
  createJobController,
  getAllJobs,
} from "../controllers/jobsController.js";
import userAuth from "../middelwares/authMiddelware.js";
const router = express.Router();

router.post("/create-job", userAuth, createJobController);
router.get("/get-Jobs", userAuth, getAllJobs);
export default router;
