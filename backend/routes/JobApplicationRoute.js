import express from "express";

import {
  createJobApplication,
  changeJobApplicationStatus,
  getJobApplicationsByUserId,
  getJobApplicationsByJobId,
  getAllJobApplications,
  deleteJobApplication,
} from "../controllers/JobApplicationController.js";
import { verifyUser, staffOnly, userOnly, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router(); //Function express

//job application
router.post(
  "/createjobapplication",
  verifyUser,
  adminOnly,
  createJobApplication
);
router.post(
  "/changejobapplicationstatus",
  verifyUser,
  staffOnly,
  changeJobApplicationStatus
);
router.post(
  "/getjobapplicationbyuserid",
  verifyUser,
  userOnly,
  getJobApplicationsByUserId
);
router.post(
  "/getjobapplicationbyjobid",
  verifyUser,
  staffOnly,
  getJobApplicationsByJobId
);

router.get(
  "/getjobapplication",
  getAllJobApplications
);

router.get(
  "/deletejobapplication",
  deleteJobApplication
);

export default router;
