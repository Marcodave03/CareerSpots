import db from '../models/Association.js'; 

const JobApplication = db.models.JobApplications; 

export const createJobApplication = async(req, res) => 
{
    let jobApplication = JobApplication.build({
        user_id: req.body.user_id,
        job_id: req.body.job_id,  
        status: "active"
    }); 
    jobApplication.save().then((data) => {res.send(data)}); 
}
