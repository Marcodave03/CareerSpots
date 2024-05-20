import db from '../models/Association.js';

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
        const {userId} = req.body; 
        const { count, rows } = await db.models.JobApplications.findAndCountAll({
            where: {
              user_id: userId
            }
          });
        res.status(200).json({ rows, msg: "job application by user id fetched successfully" });
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
        const {jobId} = req.body; 
        const { count, rows } = await db.models.JobApplications.findAndCountAll({
            where: {
                job_id: jobId
            }
        });
        res.status(200).json({ rows, msg: "job application by job id fetched successfully" });
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}