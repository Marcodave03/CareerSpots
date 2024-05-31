import db from '../models/Association.js';

export const getJob = async (req, res) => {
    try {
        const jobs = await db.models.Jobs.findAll({
            include: [
                {
                    model: db.models.Staffs,
                    attributes: ['staff_id'], 
                    include:[
                        {
                            model: db.models.Companies,
                            attributes: ['company_name', 'location'], 
                        },
                    ]
                },
            ],
        });
        res.status(200).json({ jobs });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const createJob = async (req, res) => {
    try {
        const { staff_id } = req.body;
        const staff = await db.models.Staffs.findByPk(staff_id);
        if (!staff) {
            return res.status(404).json({ msg: "Staff not found" });
        }
        const newJob = await db.models.Jobs.create(req.body);
        //await staff.addJob(newJob); // Associate the job with the staff member
        res.status(201).json({ msg: "Job created successfully", job: newJob });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const deleteJob = async(req,res)=>{ 
    try{
        await db.models.Job.destroy({
            where:{
                job_id: req.params.job_id
            }
        });
        res.status(200).json({msg: "Job Deleted"});
    } catch(error){
        console.log(error.message)
    }
}

export const updateJob = async (req, res) => {
    try {
        const { job_id } = req.params;
        const jobToUpdate = await db.models.Jobs.findByPk(job_id);

        if (!jobToUpdate) {
            return res.status(404).json({ msg: "Job not found" });
        }

        const updatedJob = await jobToUpdate.update(req.body);

        res.status(200).json({ msg: "Job updated successfully", job: updatedJob });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};