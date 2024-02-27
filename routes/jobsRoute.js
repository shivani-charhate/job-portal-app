import express, { application } from "express";
import {
  createJobController,
  getAllJobs,
  updateJobController,
  deleteJobController,
} from "../controllers/jobsController.js";
import userAuth from "../middelwares/authMiddelware.js";
const router = express.Router();

router.post("/create-job", userAuth, createJobController);
router.get("/get-Jobs", userAuth, getAllJobs);
router.put("/update-Job/:id", userAuth, updateJobController);
router.delete("/delete-Job/:id", userAuth, deleteJobController);
export default router;
