import express from "express";

import {
  createUserInterview,
  getUserInterviewsByUserId
} from "../controllers/UserInterviewsController.js";

const router = express.Router();

router.post(
  "/createuserinterview",
  createUserInterview
);

router.get(
  "/getuserinterviewsbyuserid/:id",
  getUserInterviewsByUserId
);

export default router;
