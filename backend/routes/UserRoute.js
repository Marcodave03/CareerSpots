import express from "express";
import {getUsers,
        getUserById,
        createUser,
        updateUser,
        deleteUser,
        createPhoto
    } from "../controllers/UserController.js";
import loginController from '../controllers/LoginController.js';

const router = express.Router(); //Function express

// controller
router.get('/user',getUsers); // ambil semua user
router.get('/user/:id',getUserById); // ambil id
//router.post('/user',createUser); 
router.post('/user',createPhoto);
router.patch('/user/:id',updateUser); 
router.delete('/user/:id',deleteUser); 

router.post('/login', loginController.loginUser);

export default router;






