import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';

interface Job {
    job_id: number;
    job_name: string;
}

const Job: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const { id} = useParams<{ id: string }>();

    const getJob = async () => {
        try {
            const response = await axios.get<Job[]>('http://localhost:5000/jobs');
            setJobs(response.data);
            // console.log(setJobs); 
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getJob();
    }, []);

    const addToJobApplication = async (job_id: number) => {
        console.log(id); 
        try {
            await axios.post("http://localhost:5000/addjobapplication", 
            {
                "job_id": job_id, 
                "user_id": id,
            }
            , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // await axios.delete(`http://localhost:5000/users/${user_id}`);
            // getUser();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <Link to={`/add`} className='btn btn-success mb-2'>Add New</Link>
                    <Link to={`/login`} className='btn btn-info ml-2 mb-2'>New Account</Link>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>job name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job, index) => (
                                <tr key={job.job_id}>
                                    <td>{index + 1}</td>
                                    <td>{job.job_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row justify-content-center mt-3">
                {jobs.map(job => (
                    <div className="col-md-4 mb-5" key={job.job_id}>
                        <div className="card h-100 mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{job.job_name}</h5>
                                <button onClick={() => addToJobApplication(job.job_id)} className='btn btn-sm btn-danger'>Apply</button>
                            </div> 
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Job;

