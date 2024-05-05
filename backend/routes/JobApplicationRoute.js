import express from "express"; 

import { createJobApplication } from "../controllers/JobApplicationController.js";

const router = express.Router(); 

router.post("/addjobapplication", createJobApplication); 
export default router; 