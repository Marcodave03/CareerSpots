import express from "express";

import { getJob, createJob, deleteJob } from "../controllers/JobController.js";
import { verifyUser, staffOnly, adminOnly } from "../middlewares/AuthUser.js";

const router = express.Router();

router.get("/job", getJob);
router.post("/job", verifyUser, staffOnly, createJob);
router.delete("/job/:job_id", verifyUser, adminOnly, deleteJob);

export default router;
