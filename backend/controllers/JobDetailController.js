import db from '../models/Association.js';

export const getJobDetailByJobId = async (req, res) => {
    try {
        const response = await db.models.JobDetail.findOne({
            where: {
                job_id: req.params.id
            }
        });
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const updateJobDetail = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await db.models.Job.findOne({ where: { job_id: jobId } });

        if (!job) {
            return res.status(404).json({ msg: "Job not found" });
        }

        const { job_description, job_requirement } = req.body;

        await db.models.JobDetail.update({job_description, job_requirement}, {
            where: { job_id: jobId }
        });

        res.status(200).json({ msg: "Job Detail updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

