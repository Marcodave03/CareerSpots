import express from "express";

import { getJob, createJob, deleteJob, getJobById, getJobByStaffId} from "../controllers/JobController.js";
import { verifyUser, staffOnly, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/job", getJob);
router.get("/jobById/:job_id", getJobById); 
router.post("/job", verifyUser, staffOnly, createJob);
router.delete("/job/:job_id", verifyUser, adminOnly, deleteJob);

router.get("/jobByStaffId/:staff_id", getJobByStaffId); 
export default router;
