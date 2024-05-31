import React, {useState, useEffect} from 'react';
import axios from "axios";
import Navbar from "../components/navbar.tsx";
import Search from "../components/search.tsx";
import Filter from "../components/filter.tsx";
import Jobs from "../components/jobs.tsx";
import './Style/main.css';
import Footer from '../components/footer.tsx';

const Job = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    const response = await axios.get("http://localhost:5000/job");
    console.log(response.data.jobs); 
    setJobs(Array.from(response.data.jobs));
  };
  return (
    <div>
      <div className='Home bg-body-secondary'>
        <Navbar/> 
        <Filter/>
        <div className="container mt-4">
          <div className="row justify-content-center">
          <Search/>
            <div className="col text-center">
            <div className="d-flex flex-wrap justify-content-center mt-4">
                {jobs.map((j: any)=>
                <div className="col col-md-5 col-lg-4"><Jobs jobTitle={j.job_name} jobLocation={j.job_location} jobType={j.job_type} companyName={j.company_name}/></div>)
                }
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default Job
