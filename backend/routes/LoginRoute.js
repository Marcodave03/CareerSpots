import express from 'express';
import loginController from '../controllers/LoginController';

const router = express.Router();

router.post('/Login', loginController.loginUser);

export default router;
