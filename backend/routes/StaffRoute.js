import express from "express";

import {
  getStaff,
  createStaff,
  deleteStaff,
} from "../controllers/StaffController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/staffs", verifyUser, adminOnly, getStaff);
router.post("/staffs", verifyUser, adminOnly, createStaff);
router.delete("/staffs/:staff_id", verifyUser, adminOnly, deleteStaff);

export default router;
