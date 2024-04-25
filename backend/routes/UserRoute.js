import express from "express";
import {getUsers,
        getUserById,
        createUser,
        updateUser,
        deleteUser
    } from "../controllers/UserController.js";
import loginController from '../controllers/LoginController.js';

const router = express.Router();

// controller
router.get('/users',getUsers); 
router.get('/users/:id',getUserById); 
router.post('/users',createUser); 
router.patch('/users/:id',updateUser); 
router.delete('/users/:id',deleteUser); 

router.post('/login', loginController.loginUser);

export default router;






