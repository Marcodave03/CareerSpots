import express from "express"; 

import { bulkCreateJobs, getJobs } from "../controllers/JobController.js";

const router = express.Router(); 

router.get("/", bulkCreateJobs); 
router.get("/jobs", getJobs); 
export default router; 