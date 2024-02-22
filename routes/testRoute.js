import express from "express";
import { testPostController } from "../controllers/testController.js";

// router object
const router = express.Router();

router.post('/test',testPostController)



export default router;