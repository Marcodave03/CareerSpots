import {useState, useEffect} from 'react';
import axios from "axios";
import InterviewCard from "../../../../components/interviewCardDashboard";
import '../../../Style/interviewpage.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../app/store';
import { getMe } from '../../../../features/authSlice';


const InterviewPage = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState<number>(-1); 
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
      if(user)
      {
          setUserID(user.user_id);
      }
    }, [isError, isSuccess, user, navigate]);
  const fetchJobApplications = async () => {
    try {
      if(userID != -1)
      {
        console.log(userID); 
        const response = await axios.get<any>(
          "http://localhost:5000/getuserinterviewsbyuserid/" + userID);
        setInterviews(response.data); 
        // console.log(response.data);
        // console.log(interviews.Interview); 
        setLoading(false); 
      }

    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobApplications();
  }, [userID]);

  return (
    <div style={{backgroundColor:"#ccc"}}>
      <div className='Home bg-body-secondary' style={{padding:"50px", backgroundColor:"white"}}>
        {/* <div className="container mt-4"> */}
          {/* <div className="row justify-content-center"> */}
            <div className="col text-center">
            <div className="d-flex flex-wrap mt-4 d-flex">
                {interviews.map((j: any)=>
                <div className="col col-md-5 cardWrapper col-lg-4"><InterviewCard
                interview_id={j.Interview.interview_id}
                interview_name={j.Interview.interview_name}
                interview_imagelink={j.Interview.interview_imagelink}
                interview_link={j.Interview.interview_link}
                interview_prompt={j.Interview.interview_prompt}
                /></div>)
                }
              </div>
            </div>
          </div>
        </div>
      // </div>
    // </div>
  )
}

export default InterviewPage
