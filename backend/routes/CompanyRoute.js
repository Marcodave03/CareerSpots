import express from "express";

import {
  getCompany,
  createCompany,
  deleteCompany,
  getCompanyById,
} from "../controllers/CompanyController.js";
import { verifyUser, adminOnly } from "../middlewares/AuthUser.js";

const router = express.Router();

router.get("/companies", getCompany);
router.get("/companies/:company_id", getCompanyById);
router.post("/companies", verifyUser, adminOnly, createCompany);
router.delete("/companies/:company_id", verifyUser, adminOnly, deleteCompany);

export default router;
