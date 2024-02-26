import express from "express";
import { updateUserController } from "../controllers/userController.js";
import userAuth from "../middelwares/authMiddelware.js";

const router = express.Router();

router.put("/update-user/:id", userAuth, updateUserController);

export default router;
