import express from "express";
// import {getUsers,
//         getUserById,
//         createUser,
//         updateUser,
//         deleteUser,
//         createPhoto,
//         getUserss
//     } from "../controllers/UserController.js";
import {
    getUser,
    getUserById,
    createProfile,
    updateUser,
    deleteUser
} from "../controllers/UsersController.js";
//import loginController from '../controllers/LoginController.js';

const router = express.Router(); //Function express

// controller
// router.get('/user',getUsers); // ambil semua user
// router.get('/user/:id',getUserById); // ambil id
//router.post('/user',createUser); 
// router.post('/user',createPhoto);
// router.patch('/user/:id',updateUser); 
// router.delete('/user/:id',deleteUser); 
// router.post('/login', loginController.loginUser);

router.get('/users',getUser);
router.get('/users/:user_id', getUserById)
router.post('/users',createProfile);
router.patch('/users/:user_id',updateUser);
router.delete('/users/:user_id', deleteUser);


export default router;






