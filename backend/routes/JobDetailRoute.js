import express from "express";

import {
    getJobDetailByJobId,
    updateJobDetail
} from "../controllers/JobDetailController.js";
const router = express.Router();

router.get("/getjobdetailbyjobid/:id", getJobDetailByJobId);
router.patch("/updatejobdetail/:id", updateJobDetail);

export default router;
