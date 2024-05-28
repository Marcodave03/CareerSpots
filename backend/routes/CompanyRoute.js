import express from "express";

import {
  getCompany,
  createCompany,
  createCompanys,
  deleteCompany,
  getCompanyById,
} from "../controllers/CompanyController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/companies", getCompany);
router.get("/companies/:company_id", getCompanyById);
//router.post("/companies",createCompany);
router.post("/companies",createCompanys);
router.delete("/companies/:company_id",deleteCompany);

export default router;
