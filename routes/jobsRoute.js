import express, { application } from "express";
import {
  createJobController,
  getAllJobs,
  updateJobController,
  deleteJobController,
} from "../controllers/jobsController.js";
import userAuth from "../middelwares/authMiddelware.js";
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Job:
 *      type: object
 *      required:
 *        - company
 *        - position
 *        - status
 *        - workType
 *        - workLocation
 *        - createdBy
 *      properties:
 *        id:
 *          type: string
 *          description: The Auto-generated id of user collection
 *          example : DHSASDHJDJHVAJDSVJAVSD
 *        company:
 *          type: string
 *          description: Company name
 *        position:
 *          type: string
 *          description: Job position
 *        status:
 *          type: string
 *          description: Job status
 *        workType:
 *          type: string
 *          description: Job WorkType
 *        workLocation:
 *          type: string
 *          description: Job location city or country
 *      example:
 *        id: GDHJGD788BJBJ
 *        company: Wipro
 *        position: Tester
 *        status: Pending
 *        workType: full-time
 *        workLocation: Mumbai
 */

/**
 *  @swagger
 *  tags:
 *    name: Job
 *    description: Jobs apis
 */

/**
 * @swagger
 * /api/v1/job/create-job:
 *    post:
 *      summary: new job created
 *      tags: [Job]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *      responses:
 *        200:
 *          description: Job created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Job'
 *        500:
 *          description: internal serevr error
 */

router.post("/create-job", userAuth, createJobController);

router.get("/get-Jobs", userAuth, getAllJobs);
router.put("/update-Job/:id", userAuth, updateJobController);
router.delete("/delete-Job/:id", userAuth, deleteJobController);
export default router;
