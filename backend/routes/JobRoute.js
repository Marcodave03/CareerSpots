import express from "express";

import { getJob, createJob, deleteJob, getJobById, getJobByStaffId, updateJob} from "../controllers/JobController.js";
import { verifyUser, staffOnly, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/job", getJob);
router.get("/jobById/:job_id", getJobById); 
router.post("/job", verifyUser, staffOnly, createJob);
router.delete("/job/:job_id", deleteJob);
router.patch("/job/:job_id", updateJob);

router.get("/jobByStaffId/:staff_id", getJobByStaffId); 
export default router;
