import express from "express";

import {
  getStaff,
  createStaff,
  deleteStaff,
  getFellowStaff,
  getStaffByUserId
} from "../controllers/StaffController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/staffs", verifyUser, adminOnly, getStaff);
router.post("/staffs", verifyUser, adminOnly, createStaff);
router.delete("/staffs/:staff_id", verifyUser, adminOnly, deleteStaff);

router.get("/staff/:user_id", getStaffByUserId); 
router.get("/fellowstaffs/:company_id", getFellowStaff);

export default router;
