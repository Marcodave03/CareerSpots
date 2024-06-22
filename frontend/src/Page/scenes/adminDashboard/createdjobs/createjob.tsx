import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import '../../../Style/userdashboard.css';
import { AppDispatch } from '../../../../app/store';
import { getMe } from '../../../../features/authSlice';
import Header from '../../../../components/Header';

interface User {
    name: string;
    email: string;
    password: string;
    role: string;
    image_url: string;
    url: string;
}

const CreateJob: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [userID, setUserID] = useState<number>();
    const [staffID, setStaffID] = useState<number>();
    const [jobName, setJobName] = useState<string>("");
    const [jobType, setJobType] = useState<string>("");
    const [jobLevel, setJobLevel] = useState<string>("");
    const [jobLocation, setJobLocation] = useState<string>("");
    const [jobSalary, setJobSalary] = useState<number>(-1);
    const [jobDescription, setJobDescription] = useState<string>("");
    const [jobRequirements, setJobRequirements] = useState<string>("");
    const navigate = useNavigate();

    const { isError, user, isSuccess } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);
    useEffect(() => {
        if (isError) {
            navigate("/");
        }
        if (user) {
            setUserID(user.user_id);
            console.log(userID);
        }
    }, [isError, isSuccess, user, navigate]);

    useEffect(() => {
        getStaffById();
    }, [userID]);

    const getStaffById = async () => {
        try {
            const response = await axios.get<any>(`http://localhost:5000/staff/${userID}`);
            setStaffID(response.data.staff_id);
        } catch (error) {
            console.log(error);
        }
    };

    const createJob = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // console.log("sampe sini"); 
            // await axios.patch(`http://localhost:5000/users/${userID}`, {
            //     "name": name,
            //     "password": password
            // });
            // // console.log({about, phone, cv}); 
            const newJob = await axios.post(`http://localhost:5000/job`,
                {
                    "staff_id": staffID,
                    "job_name": jobName,
                    "job_type": jobType,
                    "job_level": jobLevel,
                    "job_location": jobLocation,
                    "job_salary": jobSalary,
                    "is_hiring": "true", 
                    "job_description": jobDescription,
                    "job_requirement": jobRequirements
                });

            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="container mt-5 dashboard-content">
            <div className="row">
                <div className="col-md-6">
                    <Header title="CREATE JOB" subtitle="" />
                    <Link to={"/staffdashboard/createdjobs"} style={{ fontSize: "15px" }}> back</Link>
                    <form onSubmit={createJob}>
                        <div className="mb-3">
                            <label htmlFor="job_name" className="form-label">Job Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                onChange={(e) => setJobName(e.target.value)}
                                placeholder="Job Name"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="job_type" className="form-label">Job Type</label>
                            <input
                                type="text"
                                className="form-control"
                                id="job_type"
                                onChange={(e) => setJobType(e.target.value)}
                                placeholder="Job Type"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="job_level" className="form-label">Job Level</label>
                            <input
                                type="text"
                                className="form-control"
                                id="job_level"
                                onChange={(e) => setJobLevel(e.target.value)}
                                placeholder="Job Level"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="job_location" className="form-label">Job Location</label>
                            <input
                                type="string"
                                className="form-control"
                                id="job_location"
                                onChange={(e) => setJobLocation(e.target.value)}
                                placeholder="Job Location"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="job_salary" className="form-label">Job Salary</label>
                            <input
                                type="number"
                                className="form-control"
                                id="job_salary"
                                onChange={(e) => setJobSalary(parseInt(e.target.value))}
                                placeholder="Job Salary"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="job_description" className="form-label">Job Description</label>
                            <textarea
                                className="form-control createJob-text"
                                id="job_description"
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="Job Description"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="job_requirements" className="form-label">Job Requirements</label>
                            <textarea
                                className="form-control createJob-text"
                                id="job_requirements"
                                onChange={(e) => setJobRequirements(e.target.value)}
                                placeholder="Job Requirements"
                            />
                        </div>
                        <button type="submit" className="btn btn-success" style={{ border: "none", backgroundColor: "#0062FF" }}>Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateJob;
