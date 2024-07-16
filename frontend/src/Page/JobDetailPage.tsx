import React, {useState, useEffect} from 'react';
import axios from "axios";
import Navbar from "../components/navbar.tsx";
import Search from "../components/search.tsx";
import Filter from "../components/filter.tsx";
import JobDetail from "../components/JobDetail.tsx";
import './Style/main.css';
import Footer from '../components/footer.tsx';
import {useParams } from 'react-router-dom';
type JobProps = 
{
    job_name: string,
    company_name: string, 
    job_type: string, 
    job_location: string, 
    job_salary: number,
    job_id: number, 
    staff_id: number,
    job_description: any,
    job_requirement: any
}
const JobDetailPage = () => {
  const [jobs, setJobs] = useState<JobProps>();
  let {id} = useParams(); 
  useEffect(() => {
    getJobById();
  }, []);

  const getJobById = async () => {
    const response = await axios.get("http://localhost:5000/jobById/" + id);
    const responseDetail = await axios.get("http://localhost:5000/getjobdetailbyjobid/" + response.data.job_id)
    let uid = null; 
    const selectedJob:JobProps =
    {
      job_name: response.data.job_name,
      company_name: response.data.Staff.Company.company_name, 
      job_type: response.data.job_type, 
      job_location: response.data.job_location, 
      job_salary: response.data.job_salary,
      job_id: response.data.job_id,
      staff_id: response.data.staff_id, 
      job_description: responseDetail.data.job_description,
      job_requirement: responseDetail.data.job_requirement
    }
    console.log(selectedJob); 
    setJobs(selectedJob);
  };
  
  return (
    <div>
      <div className='Home bg-body-secondary'>
        <Navbar/> 
        <Filter/>
        <div className="container mt-4">
          <div className="row justify-content-center">
          <Search/>
          <div className='col' style={{margin: "10px"}}>
          <JobDetail jobLocation={jobs?.job_location} jobId={jobs?.job_id} jobSalary={jobs?.job_salary}
          jobTitle={jobs?.job_name} jobType={jobs?.job_type} companyName={jobs?.company_name}
          staff_id={jobs?.staff_id} jobDescription={jobs?.job_description} jobRequirement={jobs?.job_requirement}/>
          </div>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default JobDetailPage
