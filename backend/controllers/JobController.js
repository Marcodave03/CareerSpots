import db from '../models/Association.js'; 

const Job = db.models.Jobs; 

export const getJobs = async(req,res)=>{ //request, response
    try{
        const response = await Job.findAll(); //dari model User, findAll() dari sequelize
        res.status(200).json(response);
    } catch(error){
        console.log(error.message)
    }
}

export const bulkCreateJobs = async(req, res) => 
{
    // let job = Job.build({
    //     job_name: "job1", 
    //     job_type: "tipe1", 
    //     job_level: "level1", 
    //     job_location: "lokasi1", 
    //     job_salary: 100, 
    // }); 
    // job.save().then((data) => {res.send(data)}); 
    await Job.bulkCreate(
    [
        {
            job_name: "job1", 
            job_type: "tipe1", 
            job_level: "level1", 
            job_location: "lokasi1", 
            job_salary: 100, 
        }, 
        {
            job_name: "job2", 
            job_type: "tipe2", 
            job_level: "level2", 
            job_location: "lokasi2", 
            job_salary: 100, 
        }, 
        {
            job_name: "job3", 
            job_type: "tipe3", 
            job_level: "level3", 
            job_location: "lokasi3", 
            job_salary: 100, 
        }, 
        ]
        ).then((data) => {res.send(data);})
}
