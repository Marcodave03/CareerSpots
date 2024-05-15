import express from "express";
import {
  getUser,
  getUserById,
  createProfile,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/UsersController.js";

const router = express.Router(); //Function express

router.get("/users", getUser);
router.get("/users/:user_id", getUserById);
router.post("/users", createUser);
router.patch("/users/:user_id", updateUser);
router.delete("/users/:user_id", deleteUser);
export default router;
