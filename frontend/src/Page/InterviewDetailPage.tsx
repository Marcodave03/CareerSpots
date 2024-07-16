import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from "../components/navbar.tsx";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import './Style/main.css';
import './Style/interviewpage.css';
import Footer from '../components/footer.tsx';
import { useParams } from 'react-router-dom';

import InterviewDetailVideo from "./scenes/InterviewDetailPage/InterviewDetailVideo"; 
import Simulation from "./scenes/InterviewDetailPage/InterviewDetailSimulation"; 

type InterviewProps =
{
    interview_id: number, 
    interview_name: string,
    interview_link: string,
    interview_imagelink: string,
    interview_prompt: string
}


const JobDetailPage = () => {
    const [interview, setInterview] = useState<InterviewProps>();
    let { id } = useParams();
    useEffect(() => {
        getInterviewById();
    }, []);

    const getInterviewById = async () => {
        const response = await axios.get("http://localhost:5000/interviews/" + id);
        const selectedInterview: InterviewProps =
        {
            interview_id: response.data.interview_id, 
            interview_name: response.data.interview_name,
            interview_link: response.data.interview_link,
            interview_imagelink: response.data.interview_imagelink,
            interview_prompt: response.data.interview_prompt
        }
        setInterview(selectedInterview);
    };

    return (
        <div>
            <div className='Home bg-body-secondary'>
                <Navbar />
                <div className="container mt-4 interview-body">
                    <div className="row" style={{ textAlign: "center" }}>
                        <div className="interviewdetailnav col-sm-4">
                            <Link to={"/interview"} style={{ textDecoration: "none" }}>back</Link>
                        </div>
                        <div className="interviewdetailnav col-sm-4">
                            <Link to={"/interviewdetail/" + id + "/video"} style={{ textDecoration: "none" }}>video</Link>
                        </div>
                        <div className="interviewdetailnav col-sm-4">
                            <Link to={"/interviewdetail/" + id + "/simulation"} style={{ textDecoration: "none" }}>simulation</Link>
                        </div>
                    </div>
                    <main className="content">
                        <Routes>
                            <Route path="video" element={<InterviewDetailVideo interview_name={interview?.interview_name} interview_link={interview?.interview_link}/>} />
                            <Route path="simulation" element={<Simulation interview_prompt={interview?.interview_prompt}/>} />
                        </Routes>
                    </main>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default JobDetailPage
