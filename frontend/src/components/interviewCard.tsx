import { useEffect, useState } from 'react';
import Logo from '../assets/Ellipse.png';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import { getMe } from '../features/authSlice';
import axios from 'axios';

import '../Page/Style/interviewpage.css';

type InterviewProps =
    {
        interview_id: number, 
        interview_name: string,
        interview_link: string,
        interview_imagelink: string,
        interview_prompt: string
    }

const jobs = (props: InterviewProps) => {
    const[login, setLogin] = useState<Boolean>(true);
    const dispatch = useDispatch<AppDispatch>();
    const { isError, user } = useSelector((state: any) => state.auth);
  
    useEffect(() => {
      dispatch(getMe());
    }, [dispatch]);
  
    useEffect(() => {
      if (isError) {
        setLogin(false); 
      }
    }, [isError]);
  
    const createUserInterview = async(e:any) =>
    {
      // console.log(user);
      e.preventDefault(); 
      try
      {
        if(login)
        {
          // console.log(user.user_id); 
          await axios.post("http://localhost:5000/createuserinterview", 
            {
              user_id: user.user_id, 
              interview_id: props.interview_id
            }
          )
        }
      }
      catch(error:any)
      {
        if(error.response)
          {
            console.log(error.response.data.msg);
          }
      }
    }
    return (
        <div className="card" style={{ width: "18rem" }}>
            <img className="card-img-top" src={props.interview_imagelink} alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">{props.interview_name}</h5>
                <p className="card-text">{props.interview_prompt}</p>
                <button className="interviewcard-btn btn btn-primary" onClick={createUserInterview}>Add</button>
                <Link to={"/interviewdetail/" + props.interview_id + "/video"} className="interviewcard-btn btn btn-primary">Go</Link>
            </div>
        </div>

    )
}

export default jobs
