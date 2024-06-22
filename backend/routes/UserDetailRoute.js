import express from "express";

import {
    getUserDetailByUserId,
    updateUserDetail
} from "../controllers/UserDetailController.js";
const router = express.Router();

router.get("/getuserdetailbyuserid/:id", getUserDetailByUserId);
router.patch("/updateuserdetail/:id", updateUserDetail);

export default router;
