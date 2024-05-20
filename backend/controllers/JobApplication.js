import db from '../models/Association.js';

export const createJobApplication = async (req, res) => {
    try {
        const { user_id, job_id } = req.body;
        const user = await db.models.Users.findByPk(user_id);
        const job = await db.models.Jobs.findByPk(job_id);
        if (!user || !job) {
            return res.status(404).json({ msg: "User or job not found" });
        }
        const newApplication = await db.models.Job_Applications.create({ user_id, job_id });
        res.status(201).json({ msg: "Job Application created successfully", Job_Application: newApplication });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};