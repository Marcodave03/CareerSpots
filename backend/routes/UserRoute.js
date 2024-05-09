import express from "express";
import {
    getUser,
    getUserById,
    createProfile,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/UsersController.js";

import {
    getCompany,
    createCompany,
    deleteCompany,
    getCompanyById
} from "../controllers/CompanyController.js";

import {
    getStaff,
    createStaff,
    deleteStaff
} from "../controllers/StaffController.js";

import {
    getJob,
    createJob
} from "../controllers/JobController.js";

import
{
    createJobApplication, 
    changeJobApplicationStatus, 
    getJobApplicationsByUserId,
    getJobApplicationsByJobId
} from "../controllers/JobApplicationController.js"; 

const router = express.Router(); //Function express

//user
router.get('/users',getUser);
router.get('/users/:user_id', getUserById)
router.post('/users',createUser);
router.patch('/users/:user_id',updateUser);
router.delete('/users/:user_id', deleteUser);

//company
router.get('/companies',getCompany);
router.get('/companies/:company_id',getCompanyById);
router.post('/companies',createCompany);
router.delete('/companies/:company_id',deleteCompany);

//staff
router.get('/staffs',getStaff);
router.post('/staffs',createStaff);
router.delete('/staffs/:staff_id',deleteStaff);

//job
router.get('/job',getJob);
router.post('/job',createJob);

//job application
router.post('/createjobapplication', createJobApplication);
router.post('/changejobapplicationstatus', changeJobApplicationStatus); 
router.post('/getjobapplicationbyuserid', getJobApplicationsByUserId);
router.post('/getjobapplicationbyjobid', getJobApplicationsByJobId);  
export default router;