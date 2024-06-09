import express from "express";

import {
  createJobApplication,
  changeJobApplicationStatus,
  getJobApplicationsByUserId,
  getJobApplicationsByJobId,
  getJobApplicationByStaffId,
  deleteJobApplication
} from "../controllers/JobApplicationController.js";
import { verifyUser, staffOnly, userOnly } from "../middleware/AuthUser.js";

const router = express.Router(); //Function express

//job application
router.post(
  "/createjobapplication",
  verifyUser,
  userOnly,
  createJobApplication
);
router.post(
  "/changejobapplicationstatus",
  verifyUser,
  staffOnly,
  changeJobApplicationStatus
);
router.get(
  "/getjobapplicationbyuserid/:id",
  getJobApplicationsByUserId
);
router.get(
  "/getjobapplicationbyjobid/:id",
  getJobApplicationsByJobId
);

router.get(
  "/getjobapplicationbystaffid/:id",
  getJobApplicationByStaffId
)

router.get(
  "/deletejobapplication",
  deleteJobApplication
);
export default router;
