import express from "express";

import {
  createJobApplication,
  changeJobApplicationStatus,
  getJobApplicationsByUserId,
  getJobApplicationsByJobId,
} from "../controllers/JobApplicationController.js";
import { verifyUser, staffOnly, userOnly } from "../middlewares/AuthUser.js";

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
export default router;
