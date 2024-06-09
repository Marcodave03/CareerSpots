import React, {useState, useEffect} from 'react';
import axios from "axios";
import Navbar from "../components/navbar.tsx";
import Search from "../components/search.tsx";
import Filter from "../components/filter.tsx";
import InterviewCard from "../components/interviewCard.tsx";
import './Style/main.css';
import Footer from '../components/footer.tsx';

const InterviewPage = () => {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    getInterviews();
  }, []);

  const getInterviews = async () => {
    const response = await axios.get("http://localhost:5000/interviews");
    setInterviews(Array.from(response.data));
    // console.log(response.data); 
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
                {interviews.map((j: any)=>
                <div key={j.interview_id} className="col col-md-5 col-lg-4"><InterviewCard
                interview_id={j.interview_id}
                interview_name={j.interview_name}
                interview_imagelink={j.interview_imagelink}
                interview_link={j.interview_link}
                interview_prompt={j.interview_prompt}
                /></div>)
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

export default InterviewPage
