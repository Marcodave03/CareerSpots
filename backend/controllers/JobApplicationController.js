import db from '../models/Association.js';
import Op from "sequelize"; 
export const createJobApplication = async (req, res) => {
    try {
        const { user_id, job_id } = req.body;
        const status = "pending"; 
        const user = await db.models.Users.findByPk(user_id);
        const job = await db.models.Jobs.findByPk(job_id);
        if (!user || !job) {
            return res.status(404).json({ msg: "User or job not found" });
        }
        const newApplication = await db.models.JobApplications.create({ user_id, job_id, status});
        res.status(201).json({ msg: "Job Application created successfully", Job_Application: newApplication });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const changeJobApplicationStatus = async(req, res) => 
{
    try
    {
        const {jobApplicationId, new_status} = req.body; 
        const jobApplication = await db.models.JobApplications.findByPk(jobApplicationId); 
        if(!jobApplication)
        {
            return res.status(404).json({ msg: "Job application doesn't exist" });
        }
        await db.models.JobApplications.update({status: new_status}, {where: {jobhistoryid: jobApplicationId}}); 
        res.status(200).json({ msg: "job application status updated succesfully" });
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

export const getJobApplicationsByUserId = async(req, res) => 
{
    try
    {

        const response = await db.models.JobApplications.findAll({
            where: {
              user_id: req.params.id
            },
            include: [
                { model: db.models.Users, attributes: ['name', 'email', 'role'] },
                { model: db.models.Jobs, attributes: ['job_name', 'job_type', 'job_location', 'job_salary'] }
            ]
          });
        res.status(200).json(response);
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

export const getJobApplicationsByJobId = async(req, res) => 
{
     try
    {
        const { count, rows } = await db.models.JobApplications.findAll({
            where: {
                job_id: req.params.id
            },
            include: [
                { model: db.models.Users, attributes: ['name', 'email', 'role'] },
                { model: db.models.Jobs, attributes: ['job_name', 'job_type', 'job_location', 'job_salary'] }
            ]
        });
        res.status(200).json({ rows, msg: "job application by job id fetched successfully" });
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

export const getJobApplicationByStaffId = async(req, res) => 
{
    try {
        const jobsResponse = await db.models.Jobs.findAll({ 
            where: {
                staff_id: req.params.id
            }
        });
        const createdJobs= jobsResponse.map(x => x.job_id); 
        const applicationResponse = await db.models.JobApplications.findAll(
            {
                where: 
                {
                    job_id: 16
                },
                include: [
                    { model: db.models.Users, attributes: ['name', 'email', 'role'] },
                    { model: db.models.Jobs, attributes: ['job_name', 'job_type', 'job_location', 'job_salary'] }
                ]
            }
        )
        res.status(200).json(applicationResponse);
    } catch(error) {
        console.log(error.message);
    }
}

export const getAllJobApplications = async (req, res) => {
    try {
        const jobApplications = await db.models.JobApplications.findAll({
            include: [
                { model: db.models.Users, attributes: ['name', 'email', 'role'] },
                { model: db.models.Jobs, attributes: ['job_name', 'job_type', 'job_location', 'job_salary'] }
            ]
        });

        res.status(200).json({ jobApplications });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

export const deleteJobApplication = async (req, res) => {
    try {
        const { jobApplicationId } = req.params;
        const jobApplication = await db.models.JobApplications.findByPk(jobApplicationId);
        
        if (!jobApplication) {
            return res.status(404).json({ msg: "Job application not found" });
        }

        await db.models.JobApplications.destroy({
            where: { jobhistoryid: jobApplicationId }
        });

        res.status(200).json({ msg: "Job application deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}