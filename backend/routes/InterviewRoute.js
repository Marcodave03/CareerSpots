import express from "express";

import {
    getInterview,
    getInterviewById
} from "../controllers/InterviewController.js";

const router = express.Router();

router.get("/interviews", getInterview);
router.get("/interviews/:id", getInterviewById); 

export default router;
