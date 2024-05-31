import express from "express";

import { getJob, createJob, deleteJob, updateJob } from "../controllers/JobController.js";
import { verifyUser, staffOnly, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/job", getJob);
router.post("/job", createJob);
router.delete("/job/:job_id", deleteJob);
router.patch("/job/:job_id", updateJob);

export default router;
